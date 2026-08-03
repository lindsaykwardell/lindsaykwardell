/**
 * Normalize blog frontmatter tags: lowercase kebab-case, drop type duplicates.
 * Does not invent tags for untagged posts.
 *
 * Used as a publish-pipeline safety net and for one-off cleanup:
 *   npm run tags:normalize
 *   npm run tags:normalize:dry
 */
import { readdirSync, readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  parseFrontmatter,
  parseTagsFromFrontmatter,
  replaceTagsInFile,
} from './lib/frontmatter.ts'
import { normalizeTopicTags } from '../src/lib/tags.ts'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const CONTENT_DIR = resolve(ROOT, 'src/content/blog')
const dryRun = process.argv.includes('--dry-run')

const files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'))
let changed = 0
let scanned = 0

for (const file of files) {
  const filePath = resolve(CONTENT_DIR, file)
  const raw = readFileSync(filePath, 'utf-8')
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!fmMatch) continue

  const fmBlock = fmMatch[1]
  if (!/^tags:/m.test(fmBlock)) continue

  scanned++
  const fm = parseFrontmatter(raw)
  const type = fm.type ? String(fm.type) : null
  const current = parseTagsFromFrontmatter(fmBlock)
  const next = normalizeTopicTags(current, type)

  const unchanged =
    current.length === next.length && current.every((t, i) => t === next[i])
  if (unchanged) continue

  console.log(`${file}: [${current.join(', ')}] → [${next.join(', ')}]`)
  if (!dryRun) replaceTagsInFile(filePath, next)
  changed++
}

console.log(
  `\n${dryRun ? 'Would update' : 'Updated'} ${changed} / ${scanned} tagged file(s).`,
)
