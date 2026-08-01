/**
 * One-shot (and re-runnable) migration:
 * 1. Convert shows (oneOffs + live RSS) → blog markdown with link:
 * 2. Download Gaze photos → public/photos/ + blog markdown (type: Photo)
 *
 * Historical imports are live (no draft) so Sequoia can mint documents;
 * Bluesky/Mastodon still skip via maxAgeDays.
 * Re-run safely: skips files that already exist.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getShows } from '../src/content/show/index.ts'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const blogDir = path.join(root, 'src/content/blog')
const photosDir = path.join(root, 'public/photos')

function loadEnv() {
  const envPath = path.join(root, '.env')
  if (!fs.existsSync(envPath)) return
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    const i = t.indexOf('=')
    if (i === -1) continue
    const k = t.slice(0, i)
    const v = t.slice(i + 1)
    if (!process.env[k]) process.env[k] = v
  }
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

function yamlQuote(value: string): string {
  return JSON.stringify(value)
}

function formatDate(d: Date): string {
  const y = d.getUTCFullYear()
  const m = String(d.getUTCMonth() + 1).padStart(2, '0')
  const day = String(d.getUTCDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

const typeMap: Record<string, string> = {
  podcast: 'Podcast',
  video: 'Video',
  meetup: 'Meetup',
  conference: 'Conference',
}

async function migrateShows() {
  const shows = await getShows()
  const existingFiles = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md'))
  const existingByLink = new Set<string>()
  const usedSlugs = new Set(existingFiles.map((f) => f.replace(/\.md$/, '')))

  for (const file of existingFiles) {
    const body = fs.readFileSync(path.join(blogDir, file), 'utf8')
    const match = body.match(/^link:\s*(.+)$/m)
    if (match) {
      try {
        existingByLink.add(JSON.parse(match[1].trim()))
      } catch {
        existingByLink.add(match[1].trim().replace(/^["']|["']$/g, ''))
      }
    }
  }

  let created = 0
  let skipped = 0

  for (const show of shows) {
    if (existingByLink.has(show.url)) {
      skipped++
      continue
    }

    let slug = slugify(show.id || show.title) || `show-${Date.parse(String(show.pubDate))}`
    let candidate = slug
    let n = 2
    while (usedSlugs.has(candidate)) {
      candidate = `${slug}-${n++}`
    }
    usedSlugs.add(candidate)

    const type = typeMap[show.type] || 'Podcast'
    const pubDate =
      show.pubDate instanceof Date ? show.pubDate : new Date(show.pubDate)
    const fm = [
      '---',
      `pubDate: ${formatDate(pubDate)}`,
      `title: ${yamlQuote(show.title)}`,
      `author: "Lindsay Wardell"`,
      `image: ${yamlQuote(show.image)}`,
      `tags: []`,
      `type: ${type}`,
      `snippet: ${yamlQuote(show.snippet || '')}`,
      `link: ${yamlQuote(show.url)}`,
      `name: ${yamlQuote(show.name)}`,
      `host: ${show.host ? 'true' : 'false'}`,
      '---',
      '',
      show.snippet || '',
      '',
    ].join('\n')

    fs.writeFileSync(path.join(blogDir, `${candidate}.md`), fm)
    existingByLink.add(show.url)
    created++
  }

  console.log(
    `Shows: created ${created}, skipped existing ${skipped}, total source ${shows.length}`,
  )
}

async function migratePhotos() {
  loadEnv()
  const api = process.env.GAZE_API_URL
  const userId = process.env.GAZE_USER_ID
  if (!api || !userId) {
    console.warn('GAZE_API_URL / GAZE_USER_ID missing — skipping photos')
    return
  }

  fs.mkdirSync(photosDir, { recursive: true })
  const res = await fetch(`${api}/public-photos?user_id=${userId}`)
  if (!res.ok) throw new Error(`Gaze fetch failed: ${res.status}`)
  const data = await res.json()
  const photos = data.photos ?? []

  let created = 0
  let skipped = 0

  for (const photo of photos) {
    const id = photo.id as string
    const slug = `photo-${id.slice(0, 8)}`
    const mdPath = path.join(blogDir, `${slug}.md`)
    if (fs.existsSync(mdPath)) {
      skipped++
      continue
    }

    const remoteUrl = photo.url as string
    const ext = path.extname(new URL(remoteUrl).pathname) || '.jpg'
    const filename = `${id}${ext}`
    const localRel = `/photos/${filename}`
    const localPath = path.join(photosDir, filename)

    if (!fs.existsSync(localPath)) {
      const imgRes = await fetch(remoteUrl)
      if (!imgRes.ok) {
        console.warn(`Failed to download ${remoteUrl}: ${imgRes.status}`)
        continue
      }
      const buf = Buffer.from(await imgRes.arrayBuffer())
      fs.writeFileSync(localPath, buf)
    }

    const word = photo.word || ''
    const description = (photo.description || '').trim()
    const createdAt = new Date(photo.created_at || photo.week_of || Date.now())
    const title = word || description.slice(0, 60) || `Photo ${id.slice(0, 8)}`
    const snippet = description || (word ? `Photo: ${word}` : 'A photograph.')

    const tags = [word].filter(Boolean)
    const fm = [
      '---',
      `pubDate: ${formatDate(createdAt)}`,
      `title: ${yamlQuote(title)}`,
      `author: "Lindsay Wardell"`,
      `image: ${yamlQuote(localRel)}`,
      `tags: [${tags.map(yamlQuote).join(', ')}]`,
      `type: Photo`,
      `snippet: ${yamlQuote(snippet)}`,
      `gazeId: ${yamlQuote(id)}`,
      photo.week_of ? `weekOf: ${yamlQuote(photo.week_of)}` : null,
      '---',
      '',
      description || '',
      '',
    ]
      .filter((l) => l !== null)
      .join('\n')

    fs.writeFileSync(mdPath, fm)
    created++
  }

  console.log(`Photos: created ${created}, skipped existing ${skipped}, downloaded into ${photosDir}`)
}

await migrateShows()
await migratePhotos()
console.log('Done.')
