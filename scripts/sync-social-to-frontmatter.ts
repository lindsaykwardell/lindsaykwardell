/**
 * Copy Sequoia bskyPostRef (and atUri if missing) into blog post frontmatter.
 */
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { upsertFrontmatter } from './lib/frontmatter.ts'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SEQUOIA_STATE_PATH = resolve(ROOT, '.sequoia-state.json')
const CONTENT_DIR = resolve(ROOT, 'src/content/blog')
const BSKY_HANDLE = 'lindsaykwardell.com'

type SequoiaState = {
  posts?: Record<
    string,
    {
      atUri?: string
      slug?: string
      bskyPostRef?: { uri: string; cid?: string }
    }
  >
}

function bskyUrlFromUri(uri: string): string {
  const rkey = uri.split('/').pop()
  return `https://bsky.app/profile/${BSKY_HANDLE}/post/${rkey}`
}

let state: SequoiaState
try {
  state = JSON.parse(readFileSync(SEQUOIA_STATE_PATH, 'utf-8')) as SequoiaState
} catch {
  console.error('No .sequoia-state.json found. Run sequoia publish first.')
  process.exit(1)
}

let updated = 0
for (const post of Object.values(state.posts ?? {})) {
  if (!post.slug) continue
  const filePath = resolve(CONTENT_DIR, `${post.slug}.md`)
  try {
    const changed = upsertFrontmatter(filePath, {
      atUri: post.atUri,
      blueskyUri: post.bskyPostRef?.uri,
      blueskyUrl: post.bskyPostRef?.uri
        ? bskyUrlFromUri(post.bskyPostRef.uri)
        : undefined,
    })
    if (changed) {
      console.log(`Updated ${post.slug}.md`)
      updated++
    }
  } catch (err) {
    console.warn(
      `Skip ${post.slug}:`,
      err instanceof Error ? err.message : err,
    )
  }
}

console.log(`Synced Sequoia → frontmatter (${updated} file(s) updated)`)
