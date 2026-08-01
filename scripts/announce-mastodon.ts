/**
 * Announce newly published blog posts on Mastodon.
 *
 * Skips posts that already have mastodonId in frontmatter, drafts,
 * Skips drafts, already-announced posts, syndicate:false,
 * and posts older than maxAgeDays (default 30).
 *
 * Requires MASTODON_ACCESS_TOKEN (write:statuses). Optional:
 *   MASTODON_URL (default https://mastodon.social)
 *   MASTODON_MAX_AGE_DAYS (default 30)
 */
import { readFileSync, readdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseFrontmatter, upsertFrontmatter } from './lib/frontmatter.ts'
import { destinationsFor } from '../src/lib/distribute.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const SITE_URL = 'https://lindsaykwardell.com'
const CONTENT_DIR = resolve(ROOT, 'src/content/blog')

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

function buildStatus(title: string, snippet: string | undefined, url: string) {
  const parts = [title]
  if (snippet) {
    const trimmed =
      snippet.length > 280 ? `${snippet.slice(0, 277).trimEnd()}…` : snippet
    parts.push('', trimmed)
  }
  parts.push('', url)
  let status = parts.join('\n')
  if (status.length > 500) {
    status = `${title}\n\n${url}`
  }
  return status
}

loadDotEnv()

const dryRun = process.argv.includes('--dry-run')
const token = process.env.MASTODON_ACCESS_TOKEN
const instance = (process.env.MASTODON_URL || 'https://mastodon.social').replace(
  /\/$/,
  '',
)
const maxAgeDays = Number(process.env.MASTODON_MAX_AGE_DAYS || '30')

if (!token && !dryRun) {
  console.error(
    'Missing MASTODON_ACCESS_TOKEN. Create an app at Preferences → Development on your instance.',
  )
  process.exit(1)
}

const cutoff = Date.now() - maxAgeDays * 24 * 60 * 60 * 1000
const files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'))

type Candidate = {
  filePath: string
  slug: string
  title: string
  snippet?: string
  url: string
}

const candidates: Candidate[] = []

for (const file of files) {
  const filePath = resolve(CONTENT_DIR, file)
  const raw = readFileSync(filePath, 'utf-8')
  const fm = parseFrontmatter(raw)
  if (fm.draft === true) continue
  if (fm.syndicate === false) continue
  if (fm.mastodonId) continue
  if (
    !destinationsFor({
      type: fm.type ? String(fm.type) : null,
      draft: fm.draft === true,
      syndicate: fm.syndicate === false ? false : undefined,
    }).includes('mastodon')
  )
    continue

  const pubDate = fm.pubDate ? new Date(String(fm.pubDate)) : null
  if (!pubDate || Number.isNaN(pubDate.getTime())) continue
  if (pubDate.getTime() < cutoff) continue

  const slug = file.replace(/\.md$/, '')
  // Prefer the on-site page; it carries the blurb + external link for appearances
  candidates.push({
    filePath,
    slug,
    title: String(fm.title || slug),
    snippet: fm.snippet ? String(fm.snippet) : undefined,
    url: `${SITE_URL}/blog/${slug}`,
  })
}

console.log(
  `Mastodon announce: ${candidates.length} candidate(s) (maxAgeDays=${maxAgeDays})${dryRun ? ' [dry-run]' : ''}`,
)

if (candidates.length === 0) process.exit(0)

let posted = 0
let errors = 0

for (const post of candidates) {
  const status = buildStatus(post.title, post.snippet, post.url)
  console.log(`\n→ /blog/${post.slug}`)
  console.log(status)

  if (dryRun) continue

  try {
    const res = await fetch(`${instance}/api/v1/statuses`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `blog-${post.slug}`,
      },
      body: JSON.stringify({
        status,
        visibility: 'public',
        language: 'en',
      }),
    })

    if (!res.ok) {
      console.error(`  Failed: ${res.status} ${await res.text()}`)
      errors++
      continue
    }

    const created = (await res.json()) as { id: string; url: string }
    upsertFrontmatter(post.filePath, {
      mastodonId: created.id,
      mastodonUrl: created.url,
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
