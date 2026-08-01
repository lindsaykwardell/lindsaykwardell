/**
 * Content → destination routing.
 * Site remains source of truth; these flags guide announce / cross-post scripts.
 *
 * Appearances (Podcast, etc.) syndicate as description + link to the on-site page
 * (which points at the external episode/talk).
 */
export type Destination =
  | 'bluesky'
  | 'mastodon'
  | 'standard-site'
  | 'devto'
  | 'pixelfed'

export const DESTINATIONS_BY_TYPE: Record<string, Destination[]> = {
  Programming: ['bluesky', 'mastodon', 'standard-site', 'devto'],
  Personal: ['bluesky', 'mastodon', 'standard-site'],
  Blog: ['bluesky', 'mastodon', 'standard-site'], // legacy
  Poetry: ['bluesky', 'mastodon', 'standard-site'],
  Fiction: ['bluesky', 'mastodon', 'standard-site'],
  Photo: ['bluesky', 'mastodon'],
  Podcast: ['bluesky', 'mastodon', 'standard-site'],
  Video: ['bluesky', 'mastodon', 'standard-site'],
  Meetup: ['bluesky', 'mastodon', 'standard-site'],
  Conference: ['bluesky', 'mastodon', 'standard-site'],
}

export function destinationsFor(post: {
  type?: string | null
  draft?: boolean
  syndicate?: boolean
}): Destination[] {
  if (post.draft === true || post.syndicate === false) return []
  const type = post.type || 'Personal'
  return DESTINATIONS_BY_TYPE[type] ?? ['bluesky', 'mastodon', 'standard-site']
}
