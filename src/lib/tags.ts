/** Normalize and shape post tags for frontmatter, AT Proto, and social. */

/** Lowercase kebab-case; strip leading #. */
export function normalizeTag(raw: string): string {
  return raw
    .trim()
    .replace(/^#+/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function normalizeTypeTag(type: string | null | undefined): string | null {
  if (!type) return null
  const normalized = normalizeTag(type)
  return normalized || null
}

/**
 * Topic tags only: lowercase kebab, deduped, excluding the post type.
 * Empty / null input → [].
 */
export function normalizeTopicTags(
  tags: Array<string | null | undefined> | null | undefined,
  type?: string | null,
): string[] {
  const typeTag = normalizeTypeTag(type)
  const out: string[] = []
  for (const raw of tags ?? []) {
    if (raw == null || raw === '') continue
    const tag = normalizeTag(raw)
    if (!tag) continue
    if (typeTag && tag === typeTag) continue
    if (out.includes(tag)) continue
    out.push(tag)
  }
  return out
}

/** Tags written to site.standard.document (type first, then topics). */
export function documentTags(
  type: string | null | undefined,
  tags: Array<string | null | undefined> | null | undefined,
): string[] {
  const topics = normalizeTopicTags(tags, type)
  const typeTag = normalizeTypeTag(type)
  if (!typeTag) return topics
  if (topics.includes(typeTag)) return topics
  return [typeTag, ...topics]
}

/** `#vue #web-development` — empty string when no tags. */
export function formatHashtags(tags: string[]): string {
  return tags.map((t) => `#${t}`).join(' ')
}

/**
 * Dev.to: max 4 tags, alphanumeric only (hyphens stripped).
 * Pass already-normalized topic tags.
 */
export function toDevtoTags(tags: string[], limit = 4): string[] {
  const out: string[] = []
  for (const tag of tags) {
    const cleaned = tag.replace(/[^a-z0-9]/g, '')
    if (!cleaned || out.includes(cleaned)) continue
    out.push(cleaned)
    if (out.length >= limit) break
  }
  return out
}
