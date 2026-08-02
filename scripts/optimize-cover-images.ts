/**
 * Prepare cover images for Sequoia publish.
 *
 * Sequoia rejects covers ≥ 1MB, and resolves paths via `imagesDir`
 * (`./public/blog`). Photo posts use `/photos/…`, so Sequoia falls through to
 * treating that as an absolute FS path and crashes. This script:
 *  1. Compresses any local frontmatter `image` over the size budget
 *  2. Symlinks non-`/blog/` covers into `public/blog/` by basename so Sequoia finds them
 *
 * Safe to re-run; only rewrites files that still exceed the budget.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const BLOG_DIR = path.join(ROOT, 'src/content/blog')
const PUBLIC_DIR = path.join(ROOT, 'public')
const IMAGES_DIR = path.join(PUBLIC_DIR, 'blog')

/** Sequoia hard limit — leave a little headroom. */
const MAX_BYTES = 1024 * 1024
const TARGET_BYTES = 950 * 1024
const MAX_DIMENSION = 1800

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'])

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

async function compressIfNeeded(filePath: string): Promise<boolean> {
  const before = (await fs.stat(filePath)).size
  if (before < MAX_BYTES) return false

  const ext = path.extname(filePath).toLowerCase()
  const tmp = `${filePath}.tmp`

  let quality = 82
  let maxDim = MAX_DIMENSION
  let wrote = false

  while (quality >= 40) {
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
    } else {
      // jpeg / unknown → jpeg
      pipeline = pipeline.jpeg({ quality, mozjpeg: true })
    }

    await pipeline.toFile(tmp)
    const size = (await fs.stat(tmp)).size
    if (size <= TARGET_BYTES) {
      await fs.rename(tmp, filePath)
      console.log(
        `compressed ${path.relative(ROOT, filePath)}: ${(before / 1024 / 1024).toFixed(2)}MB → ${(size / 1024 / 1024).toFixed(2)}MB (q=${quality}, max=${maxDim})`,
      )
      wrote = true
      break
    }
    quality -= 8
    if (quality < 40 && maxDim > 1000) {
      maxDim = Math.max(1000, maxDim - 200)
      quality = 78
    }
  }

  try {
    await fs.unlink(tmp)
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
      // Real file already occupies this name — leave it alone
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
  const covers = await collectCoverPaths()
  console.log(`Found ${covers.length} local cover images`)

  let compressed = 0
  let linked = 0

  for (const file of covers) {
    const ext = path.extname(file).toLowerCase()
    if (!IMAGE_EXTS.has(ext)) {
      console.warn(`Skipping unsupported type: ${path.relative(ROOT, file)}`)
      continue
    }
    if (await compressIfNeeded(file)) compressed++
    if (await stageCoverForSequoia(file)) linked++
  }

  console.log(
    `Done. Compressed ${compressed}, linked ${linked} cover(s) for Sequoia.`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
