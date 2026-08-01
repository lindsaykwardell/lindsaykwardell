/**
 * Pull new podcast RSS episodes into blog markdown (idempotent).
 * Run periodically or from CI: npx tsx scripts/sync-shows-rss.ts
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { extract } from '@extractus/feed-extractor'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const blogDir = path.join(root, 'src/content/blog')

const FEEDS = [
  {
    name: 'Human Side of Dev',
    url: 'https://anchor.fm/s/81f880f0/podcast/rss',
    image: 'https://humansideofdev.lindsaykwardell.com/images/logo.jpg',
    linkFor: (title: string) =>
      `https://humansideofdev.lindsaykwardell.com/episode/${title
        .toLowerCase()
        .replaceAll(' ', '-')}`,
    titleFor: (title: string) => `Human Side of Dev ${title}`,
  },
  {
    name: "I'm Sure It Means Nothing",
    url: 'https://anchor.fm/s/f088c584/podcast/rss',
    image:
      'https://s3-us-west-2.amazonaws.com/anchor-generated-image-bank/staging/podcast_uploaded_nologo400/40254953/40254953-1704996744044-85807a246cafe.jpg',
    linkFor: (_title: string, link?: string) => link!,
    titleFor: (title: string) => `I'm Sure It Means Nothing | ${title}`,
  },
]

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
  return d.toISOString().slice(0, 10)
}

function existingLinks(): Set<string> {
  const set = new Set<string>()
  for (const file of fs.readdirSync(blogDir).filter((f) => f.endsWith('.md'))) {
    const body = fs.readFileSync(path.join(blogDir, file), 'utf8')
    const match = body.match(/^link:\s*(.+)$/m)
    if (!match) continue
    try {
      set.add(JSON.parse(match[1].trim()))
    } catch {
      set.add(match[1].trim().replace(/^["']|["']$/g, ''))
    }
  }
  return set
}

const usedSlugs = new Set(
  fs.readdirSync(blogDir).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, '')),
)
const links = existingLinks()
let created = 0

for (const feed of FEEDS) {
  const data = await extract(feed.url)
  for (const episode of data.entries ?? []) {
    if (!episode.title || !episode.published) continue
    const link = feed.linkFor(episode.title, episode.link)
    if (!link || links.has(link)) continue

    let slug = slugify(feed.titleFor(episode.title))
    let candidate = slug
    let n = 2
    while (usedSlugs.has(candidate)) candidate = `${slug}-${n++}`
    usedSlugs.add(candidate)

    const pubDate = new Date(episode.published)
    const title = feed.titleFor(episode.title)
    const snippet = episode.description ?? ''
    const fm = [
      '---',
      `pubDate: ${formatDate(pubDate)}`,
      `title: ${yamlQuote(title)}`,
      `author: "Lindsay Wardell"`,
      `image: ${yamlQuote(feed.image)}`,
      `tags: []`,
      `type: Podcast`,
      `snippet: ${yamlQuote(snippet)}`,
      `link: ${yamlQuote(link)}`,
      `name: ${yamlQuote(feed.name)}`,
      `host: true`,
      '---',
      '',
      snippet,
      '',
    ].join('\n')

    fs.writeFileSync(path.join(blogDir, `${candidate}.md`), fm)
    links.add(link)
    created++
    console.log(`+ ${candidate}`)
  }
}

console.log(`RSS sync: created ${created} new episode(s)`)
