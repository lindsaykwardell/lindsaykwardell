/** Keep ?type= context when linking into a post from an archive. */

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

export const APPEARANCE_TYPES = new Set([
  'Podcast',
  'Video',
  'Meetup',
  'Conference',
])

/** Lead story: on-site writing only (not photos or external appearances). */
export function isReadingLeadType(type: string | null | undefined): boolean {
  const t = type === 'Blog' ? 'Personal' : type || 'Personal'
  return t !== 'Photo' && !APPEARANCE_TYPES.has(t)
}

/** Recent list: anything except photos. */
export function isReadingRecentType(type: string | null | undefined): boolean {
  const t = type === 'Blog' ? 'Personal' : type || 'Personal'
  return t !== 'Photo'
}

/** Map legacy Blog → Personal; ignore unknown values. */
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
  if (!type) return { href: '/blog', label: 'Blog' }
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
