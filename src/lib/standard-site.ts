import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import sequoiaConfig from '../../sequoia.json'

type SequoiaState = {
  posts?: Record<
    string,
    {
      atUri?: string
      slug?: string
    }
  >
}

const STATE_PATH = resolve(process.cwd(), '.sequoia-state.json')

function loadState(): SequoiaState | null {
  try {
    return JSON.parse(readFileSync(STATE_PATH, 'utf-8')) as SequoiaState
  } catch {
    return null
  }
}

/** Publication AT-URI from sequoia.json, or null if setup has not run yet. */
export function getPublicationUri(): string | null {
  const uri = sequoiaConfig.publicationUri?.trim()
  return uri || null
}

/**
 * Resolve a post's standard.site document AT-URI.
 * Prefers frontmatter (written by `sequoia publish`), then falls back to state.
 */
export function getDocumentAtUri(
  postId: string,
  frontmatterAtUri?: string | null,
): string | null {
  if (frontmatterAtUri) return frontmatterAtUri

  const state = loadState()
  if (!state?.posts) return null

  const byPath = state.posts[`src/content/blog/${postId}.md`]
  if (byPath?.atUri) return byPath.atUri

  for (const entry of Object.values(state.posts)) {
    if (entry.slug === postId && entry.atUri) return entry.atUri
  }

  return null
}
