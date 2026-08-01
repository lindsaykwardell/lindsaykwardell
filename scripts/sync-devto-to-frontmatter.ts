/**
 * Match existing Dev.to articles to local blog posts via canonical_url / title,
 * and write devtoId + devtoUrl into frontmatter.
 *
 * Usage: npx tsx scripts/sync-devto-to-frontmatter.ts [--dry-run]
 */
import { readFileSync, readdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseFrontmatter, upsertFrontmatter } from './lib/frontmatter.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const CONTENT_DIR = resolve(ROOT, 'src/content/blog')
const USERNAME = 'lindsaykwardell'

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

function normalizeUrl(url: string): string {
  try {
    const u = new URL(url)
    u.hash = ''
    u.search = ''
    const path = u.pathname.replace(/\/+$/, '') || '/'
    const host = u.hostname.replace(/^www\./, '')
    return `${host}${path}`.toLowerCase()
  } catch {
    return url.toLowerCase().replace(/\/+$/, '')
  }
}

function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

type DevtoArticle = {
  id: number
  title: string
  url: string
  canonical_url: string
  public_reactions_count: number
}

async function fetchAllArticles(): Promise<DevtoArticle[]> {
  const articles: DevtoArticle[] = []
  const headers: Record<string, string> = {
    Accept: 'application/vnd.forem.api-v1+json',
  }
  if (process.env.DEVTO_API_KEY) headers['api-key'] = process.env.DEVTO_API_KEY

  for (let page = 1; page <= 10; page++) {
    const res = await fetch(
      `https://dev.to/api/articles?username=${USERNAME}&per_page=100&page=${page}`,
      { headers },
    )
    if (!res.ok) {
      throw new Error(`Dev.to list failed: ${res.status} ${await res.text()}`)
    }
    const batch = await res.json()
    if (!Array.isArray(batch) || batch.length === 0) break
    articles.push(...batch)
    if (batch.length < 100) break
  }
  return articles
}

loadDotEnv()
const dryRun = process.argv.includes('--dry-run')

const articles = await fetchAllArticles()
console.log(`Fetched ${articles.length} Dev.to article(s)`)

const byCanonical = new Map<string, DevtoArticle>()
const byTitle = new Map<string, DevtoArticle>()
for (const article of articles) {
  if (article.canonical_url) {
    byCanonical.set(normalizeUrl(article.canonical_url), article)
  }
  byTitle.set(normalizeTitle(article.title), article)
}

const files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'))
const matchedIds = new Set<number>()
let updated = 0
let already = 0

for (const file of files) {
  const filePath = resolve(CONTENT_DIR, file)
  const raw = readFileSync(filePath, 'utf-8')
  const fm = parseFrontmatter(raw)
  const slug = file.replace(/\.md$/, '')

  const article =
    byCanonical.get(
      normalizeUrl(`https://lindsaykwardell.com/blog/${slug}`),
    ) ||
    byCanonical.get(
      normalizeUrl(`https://www.lindsaykwardell.com/blog/${slug}`),
    ) ||
    (fm.title ? byTitle.get(normalizeTitle(String(fm.title))) : null) ||
    null

  if (!article) continue
  matchedIds.add(article.id)

  const id = String(article.id)
  if (String(fm.devtoId) === id && fm.devtoUrl === article.url) {
    already++
    continue
  }

  console.log(
    `✓ ${slug} ← ${article.url} (${article.public_reactions_count} reactions)`,
  )
  if (!dryRun) {
    upsertFrontmatter(filePath, {
      devtoId: id,
      devtoUrl: article.url,
    })
  }
  updated++
}

for (const article of articles) {
  if (!matchedIds.has(article.id)) {
    console.log(`? unmatched: ${article.title} — ${article.url}`)
  }
}

console.log(
  `\nMatched: ${matchedIds.size}. Updated: ${updated}. Already synced: ${already}.${dryRun ? ' [dry-run]' : ''}`,
)
