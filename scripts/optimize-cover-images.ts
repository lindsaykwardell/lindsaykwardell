/**
 * Optimize local post images before Sequoia / deploy.
 *
 * 1. Resize any image under `public/blog` or `public/photos` whose longest
 *    edge exceeds MAX_CONTENT_DIM (without enlarging smaller files).
 * 2. Compress frontmatter cover images that still exceed Sequoia's ~1MB limit.
 * 3. Symlink non-`/blog/` covers into `public/blog/` by basename so Sequoia
 *    (imagesDir = ./public/blog) can resolve `/photos/…` paths.
 *
 * Safe to re-run; only rewrites files that need it. CI commits changes under
 * public/blog and public/photos.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const BLOG_DIR = path.join(ROOT, 'src/content/blog')
const PUBLIC_DIR = path.join(ROOT, 'public')
const IMAGES_DIR = path.join(PUBLIC_DIR, 'blog')
const SCAN_DIRS = [path.join(PUBLIC_DIR, 'blog'), path.join(PUBLIC_DIR, 'photos')]

/** Longest edge for in-post / gallery images (retina-friendly for ~42rem column). */
const MAX_CONTENT_DIM = 1200

/** Sequoia hard limit — leave a little headroom. */
const MAX_BYTES = 1024 * 1024
const TARGET_BYTES = 950 * 1024

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])
/** Animated GIFs: leave dimensions alone (sharp flattens them). */
const COVER_EXTS = new Set([...IMAGE_EXTS, '.gif'])

function parseImageFrontmatter(text: string): string | null {
  const m = text.match(/^image:\s*["']?([^"'\n]+)["']?/m)
  if (!m) return null
  const value = m[1].trim()
  if (!value || value === 'null' || value.startsWith('http')) return null
  return value
}

function toPublicPath(webPath: string): string {
  return path.join(PUBLIC_DIR, webPath.replace(/^\/+/, ''))
}

async function collectCoverPaths(): Promise<string[]> {
  const files = await fs.readdir(BLOG_DIR)
  const covers = new Set<string>()
  for (const file of files) {
    if (!file.endsWith('.md')) continue
    const text = await fs.readFile(path.join(BLOG_DIR, file), 'utf8')
    const image = parseImageFrontmatter(text)
    if (!image) continue
    const abs = toPublicPath(image)
    try {
      const stat = await fs.stat(abs)
      if (stat.isFile()) covers.add(abs)
    } catch {
      console.warn(`Missing cover: ${image} (from ${file})`)
    }
  }
  return [...covers].toSorted()
}

async function collectPublicImages(dirs: string[]): Promise<string[]> {
  const out: string[] = []
  for (const dir of dirs) {
    let entries: string[]
    try {
      entries = await fs.readdir(dir)
    } catch {
      continue
    }
    for (const name of entries) {
      const abs = path.join(dir, name)
      const ext = path.extname(name).toLowerCase()
      if (!IMAGE_EXTS.has(ext)) continue
      try {
        const stat = await fs.stat(abs)
        if (stat.isFile()) out.push(abs)
      } catch {
        /* ignore */
      }
    }
  }
  return out.toSorted()
}

async function writeResized(
  filePath: string,
  maxDim: number,
  quality: number,
  { commit = true }: { commit?: boolean } = {},
): Promise<{ size: number; tmp: string }> {
  const ext = path.extname(filePath).toLowerCase()
  const tmp = `${filePath}.tmp`

  let pipeline = sharp(filePath, { failOn: 'none' })
    .rotate()
    .resize({
      width: maxDim,
      height: maxDim,
      fit: 'inside',
      withoutEnlargement: true,
    })

  if (ext === '.png') {
    pipeline = pipeline.png({ quality, compressionLevel: 9, effort: 8 })
  } else if (ext === '.webp') {
    pipeline = pipeline.webp({ quality })
  } else if (ext === '.avif') {
    pipeline = pipeline.avif({ quality })
  } else {
    pipeline = pipeline.jpeg({ quality, mozjpeg: true })
  }

  await pipeline.toFile(tmp)
  const size = (await fs.stat(tmp)).size
  if (commit) {
    await fs.rename(tmp, filePath)
  }
  return { size, tmp }
}

/** Shrink longest edge to MAX_CONTENT_DIM when larger. */
async function resizeIfOversized(filePath: string): Promise<boolean> {
  const meta = await sharp(filePath, { failOn: 'none' }).metadata()
  const width = meta.width ?? 0
  const height = meta.height ?? 0
  if (width <= MAX_CONTENT_DIM && height <= MAX_CONTENT_DIM) return false

  const before = (await fs.stat(filePath)).size
  const { size } = await writeResized(filePath, MAX_CONTENT_DIM, 82)
  console.log(
    `resized ${path.relative(ROOT, filePath)}: ${width}×${height} → max ${MAX_CONTENT_DIM}px (${(before / 1024).toFixed(0)}KB → ${(size / 1024).toFixed(0)}KB)`,
  )
  return true
}

/** Covers only: get under Sequoia's 1MB budget (further quality / dim steps). */
async function compressCoverIfNeeded(filePath: string): Promise<boolean> {
  const before = (await fs.stat(filePath)).size
  if (before < MAX_BYTES) return false

  let quality = 82
  let maxDim = MAX_CONTENT_DIM
  let wrote = false

  while (quality >= 40) {
    const { size, tmp } = await writeResized(filePath, maxDim, quality, {
      commit: false,
    })
    if (size <= TARGET_BYTES) {
      await fs.rename(tmp, filePath)
      console.log(
        `compressed ${path.relative(ROOT, filePath)}: ${(before / 1024 / 1024).toFixed(2)}MB → ${(size / 1024 / 1024).toFixed(2)}MB (q=${quality}, max=${maxDim})`,
      )
      wrote = true
      break
    }
    try {
      await fs.unlink(tmp)
    } catch {
      /* ignore */
    }
    quality -= 8
    if (quality < 40 && maxDim > 800) {
      maxDim = Math.max(800, maxDim - 200)
      quality = 78
    }
  }

  try {
    await fs.unlink(`${filePath}.tmp`)
  } catch {
    /* ignore */
  }

  if (!wrote) {
    const after = (await fs.stat(filePath)).size
    if (after >= MAX_BYTES) {
      throw new Error(
        `Could not get ${path.relative(ROOT, filePath)} under 1MB (still ${(after / 1024 / 1024).toFixed(2)}MB)`,
      )
    }
  }

  return wrote
}

/**
 * Sequoia's resolveImagePath joins basename(cover) onto imagesDir when the
 * path doesn't contain "blog". Stage any cover outside `/blog/` into
 * `public/blog/` by basename so absolute web paths like `/photos/…` or
 * `/fsjam.webp` resolve correctly.
 */
async function stageCoverForSequoia(filePath: string): Promise<boolean> {
  const rel = path.relative(PUBLIC_DIR, filePath)
  if (rel.startsWith(`blog${path.sep}`) || rel.startsWith('blog/')) {
    return false
  }

  await fs.mkdir(IMAGES_DIR, { recursive: true })
  const dest = path.join(IMAGES_DIR, path.basename(filePath))

  try {
    const existing = await fs.lstat(dest)
    if (existing.isSymbolicLink()) {
      return false
    }
    if (existing.isFile()) {
      console.warn(
        `skip link ${path.relative(ROOT, dest)} (file already exists)`,
      )
      return false
    }
  } catch {
    /* missing — create */
  }

  const target = path.relative(IMAGES_DIR, filePath)
  await fs.symlink(target, dest)
  console.log(`linked ${path.relative(ROOT, dest)} → ${target}`)
  return true
}

async function main() {
  const images = await collectPublicImages(SCAN_DIRS)
  console.log(
    `Scanning ${images.length} image(s) in public/blog + public/photos (max ${MAX_CONTENT_DIM}px)`,
  )

  let resized = 0
  for (const file of images) {
    if (await resizeIfOversized(file)) resized++
  }

  const covers = await collectCoverPaths()
  console.log(`Found ${covers.length} local cover image(s) for Sequoia`)

  let compressed = 0
  let linked = 0

  for (const file of covers) {
    const ext = path.extname(file).toLowerCase()
    if (!COVER_EXTS.has(ext)) {
      console.warn(`Skipping unsupported cover type: ${path.relative(ROOT, file)}`)
      continue
    }
    if (IMAGE_EXTS.has(ext) && (await compressCoverIfNeeded(file))) {
      compressed++
    }
    if (await stageCoverForSequoia(file)) linked++
  }

  console.log(
    `Done. Resized ${resized}, compressed ${compressed} cover(s), linked ${linked}.`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
