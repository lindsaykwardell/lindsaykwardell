/**
 * Cross-post Programming articles to Dev.to.
 *
 * Publishes immediately with canonical_url pointing at this site.
 * Skips drafts, syndicate:false, already-posted (devtoId), empty bodies,
 * and posts older than maxAgeDays (default 30).
 *
 * Requires DEVTO_API_KEY (Settings → Extensions → DEV Community API Keys).
 * Optional: DEVTO_MAX_AGE_DAYS (default 30)
 */
import { readFileSync, readdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  parseFrontmatter,
  parseTagsFromFrontmatter,
  upsertFrontmatter,
} from './lib/frontmatter.ts'
import { destinationsFor } from '../src/lib/distribute.ts'
import { normalizeTopicTags, toDevtoTags } from '../src/lib/tags.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const SITE_URL = 'https://lindsaykwardell.com'
const CONTENT_DIR = resolve(ROOT, 'src/content/blog')
const API = 'https://dev.to/api/articles'

function loadDotEnv() {
  try {
    const content = readFileSync(resolve(ROOT, '.env'), 'utf-8')
    for (const line of content.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq === -1) continue
      const key = trimmed.slice(0, eq).trim()
      let value = trimmed.slice(eq + 1).trim()
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1)
      }
      if (!(key in process.env)) process.env[key] = value
    }
  } catch {
    // optional
  }
}

function absoluteUrl(pathOrUrl: string | undefined): string | undefined {
  if (!pathOrUrl || pathOrUrl === 'null') return undefined
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl
  if (pathOrUrl.startsWith('/')) return `${SITE_URL}${pathOrUrl}`
  return undefined
}

function absolutizeMarkdown(body: string): string {
  return body
    .replace(/\]\(\/(?!\/)/g, `](${SITE_URL}/`)
    .replace(/src="\/(?!\/)/g, `src="${SITE_URL}/`)
}

function splitMarkdown(raw: string): { fm: string; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { fm: '', body: raw }
  return { fm: match[1], body: match[2].trim() }
}

loadDotEnv()

const dryRun = process.argv.includes('--dry-run')
const apiKey = process.env.DEVTO_API_KEY
const maxAgeDays = Number(process.env.DEVTO_MAX_AGE_DAYS || '30')

if (!apiKey && !dryRun) {
  console.error(
    'Missing DEVTO_API_KEY. Generate one at Settings → Extensions on dev.to.',
  )
  process.exit(1)
}

const cutoff = Date.now() - maxAgeDays * 24 * 60 * 60 * 1000
const files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'))

type Candidate = {
  filePath: string
  slug: string
  title: string
  description?: string
  body: string
  tags: string[]
  image?: string
  url: string
}

const candidates: Candidate[] = []

for (const file of files) {
  const filePath = resolve(CONTENT_DIR, file)
  const raw = readFileSync(filePath, 'utf-8')
  const { fm: fmBlock, body } = splitMarkdown(raw)
  const fm = parseFrontmatter(raw)

  if (fm.draft === true) continue
  if (fm.syndicate === false) continue
  if (fm.devtoId) continue
  if (
    !destinationsFor({
      type: fm.type ? String(fm.type) : null,
      draft: fm.draft === true,
      syndicate: fm.syndicate === false ? false : undefined,
    }).includes('devto')
  )
    continue

  // External-only stubs (e.g. This Dot) have no body worth posting
  if (!body || body.length < 200) continue

  const pubDate = fm.pubDate ? new Date(String(fm.pubDate)) : null
  if (!pubDate || Number.isNaN(pubDate.getTime())) continue
  if (pubDate.getTime() < cutoff) continue

  const slug = file.replace(/\.md$/, '')
  const type = fm.type ? String(fm.type) : null
  candidates.push({
    filePath,
    slug,
    title: String(fm.title || slug),
    description: fm.snippet ? String(fm.snippet) : undefined,
    body: absolutizeMarkdown(body),
    tags: toDevtoTags(normalizeTopicTags(parseTagsFromFrontmatter(fmBlock), type)),
    image: absoluteUrl(fm.image ? String(fm.image) : undefined),
    url: `${SITE_URL}/blog/${slug}`,
  })
}

console.log(
  `Dev.to announce: ${candidates.length} candidate(s) (maxAgeDays=${maxAgeDays})${dryRun ? ' [dry-run]' : ''}`,
)

if (candidates.length === 0) process.exit(0)

let posted = 0
let errors = 0

for (const post of candidates) {
  console.log(`\n→ /blog/${post.slug}`)
  console.log(`  title: ${post.title}`)
  console.log(`  tags: ${post.tags.join(', ') || '(none)'}`)
  console.log(`  canonical: ${post.url}`)
  console.log(`  body: ${post.body.length} chars`)

  if (dryRun) continue

  try {
    const article: Record<string, unknown> = {
      title: post.title,
      published: true,
      body_markdown: post.body,
      canonical_url: post.url,
      tags: post.tags,
    }
    if (post.description) article.description = post.description
    if (post.image) article.main_image = post.image

    const res = await fetch(API, {
      method: 'POST',
      headers: {
        'api-key': apiKey!,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.forem.api-v1+json',
      },
      body: JSON.stringify({ article }),
    })

    if (!res.ok) {
      console.error(`  Failed: ${res.status} ${await res.text()}`)
      errors++
      continue
    }

    const created = (await res.json()) as {
      id: number
      url: string
    }
    upsertFrontmatter(post.filePath, {
      devtoId: String(created.id),
      devtoUrl: created.url,
    })
    console.log(`  Posted: ${created.url}`)
    posted++
  } catch (err) {
    console.error(`  Error:`, err)
    errors++
  }
}

console.log(`\nDone. Posted: ${posted}. Errors: ${errors}.`)
if (errors > 0) process.exit(1)
