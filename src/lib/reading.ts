/**
 * Preserve Reading archive context when opening a post from ?type=.
 */

const KNOWN_TYPES = new Set([
  'Personal',
  'Blog',
  'Programming',
  'Poetry',
  'Fiction',
  'Photo',
  'Podcast',
  'Video',
  'Meetup',
  'Conference',
])

/** Normalize legacy Blog → Personal; drop unknown values. */
export function normalizeReadingFrom(
  raw: string | null | undefined,
): string | null {
  if (!raw) return null
  const type = raw === 'Blog' ? 'Personal' : raw
  return KNOWN_TYPES.has(type) ? type : null
}

export function readingPostHref(
  id: string,
  from?: string | null,
): string {
  const type = normalizeReadingFrom(from)
  if (!type) return `/blog/${id}`
  return `/blog/${id}?from=${encodeURIComponent(type)}`
}

export function readingBackLink(from?: string | null): {
  href: string
  label: string
} {
  const type = normalizeReadingFrom(from)
  if (!type) return { href: '/blog', label: 'Reading' }
  return {
    href: `/blog?type=${encodeURIComponent(type)}`,
    label: type === 'Photo' ? 'Photos' : type,
  }
}

export function formatReadingDate(date: Date): string {
  return Intl.DateTimeFormat('en-us', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}
