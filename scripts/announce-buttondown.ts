/**
 * Create Buttondown draft emails for newly published posts.
 *
 * Does not send — you review and send in the Buttondown UI.
 * Skips drafts, syndicate:false, already-drafted (buttondownId),
 * and posts older than maxAgeDays (default 30).
 *
 * Requires BUTTONDOWN_API_KEY. Optional: BUTTONDOWN_MAX_AGE_DAYS.
 *
 * Usage: npx tsx scripts/announce-buttondown.ts [--dry-run]
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
const API = 'https://api.buttondown.com/v1/emails'

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

function buildBody(snippet: string | undefined, url: string, title: string) {
  const parts: string[] = []
  if (snippet && snippet.trim()) {
    parts.push(snippet.trim())
    parts.push('')
  }
  parts.push(`[Read “${title}” on the site](${url})`)
  return parts.join('\n')
}

loadDotEnv()

const dryRun = process.argv.includes('--dry-run')
const apiKey = process.env.BUTTONDOWN_API_KEY
const maxAgeDays = Number(process.env.BUTTONDOWN_MAX_AGE_DAYS || '30')

if (!apiKey && !dryRun) {
  console.error(
    'Missing BUTTONDOWN_API_KEY. Create one at Buttondown → Settings → API.',
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
  if (fm.buttondownId) continue
  if (
    !destinationsFor({
      type: fm.type ? String(fm.type) : null,
      draft: fm.draft === true,
      syndicate: fm.syndicate === false ? false : undefined,
    }).includes('buttondown')
  )
    continue

  const pubDate = fm.pubDate ? new Date(String(fm.pubDate)) : null
  if (!pubDate || Number.isNaN(pubDate.getTime())) continue
  if (pubDate.getTime() < cutoff) continue

  const slug = file.replace(/\.md$/, '')
  candidates.push({
    filePath,
    slug,
    title: String(fm.title || slug),
    snippet: fm.snippet ? String(fm.snippet) : undefined,
    url: `${SITE_URL}/blog/${slug}`,
  })
}

console.log(
  `Buttondown drafts: ${candidates.length} candidate(s) (maxAgeDays=${maxAgeDays})${dryRun ? ' [dry-run]' : ''}`,
)

if (candidates.length === 0) process.exit(0)

let created = 0
let errors = 0

for (const post of candidates) {
  const body = buildBody(post.snippet, post.url, post.title)
  console.log(`\n→ /blog/${post.slug}`)
  console.log(`  subject: ${post.title}`)
  console.log(`  body:\n${body.split('\n').map((l) => `    ${l}`).join('\n')}`)

  if (dryRun) continue

  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: {
        Authorization: `Token ${apiKey}`,
        'Content-Type': 'application/json',
        // Safer default: create as draft (API version 2026-04-01+)
        'X-API-Version': '2026-04-01',
      },
      body: JSON.stringify({
        subject: post.title,
        body,
        status: 'draft',
      }),
    })

    if (!res.ok) {
      console.error(`  Failed: ${res.status} ${await res.text()}`)
      errors++
      continue
    }

    const email = (await res.json()) as { id: string }
    upsertFrontmatter(post.filePath, {
      buttondownId: String(email.id),
    })
    console.log(`  Draft created: ${email.id}`)
    created++
  } catch (err) {
    console.error(`  Error:`, err)
    errors++
  }
}

console.log(`\nDone. Drafts: ${created}. Errors: ${errors}.`)
if (errors > 0) process.exit(1)
