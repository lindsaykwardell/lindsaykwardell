import { z, defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    pubDate: z.date(),
    title: z.string(),
    author: z.string(),
    image: z.string().nullable(),
    tags: z.array(z.string().optional()).optional().nullable(),
    /**
     * Content shape. Drives badges + distribute routing.
     * Essay: Personal | Programming | Poetry | Fiction
     * Media: Photo
     * Appearances: Podcast | Video | Meetup | Conference
     */
    type: z.string().nullable(),
    snippet: z.string().optional().nullable(),
    /** External canonical URL (podcast episode, talk, guest post). */
    link: z.string().url().optional(),
    /** Series / show name for appearances. */
    name: z.string().optional(),
    /** True when Lindsay hosted (podcasts/panels). */
    host: z.boolean().optional(),
    /** Sequoia + site: true = WIP (hidden in prod, not published to AT Proto). */
    draft: z.boolean().optional(),
    /** Explicit opt-out of social announce (document publish still allowed). */
    syndicate: z.boolean().optional(),
    atUri: z.string().optional(),
    blueskyUri: z.string().optional(),
    blueskyUrl: z.string().url().optional(),
    mastodonId: z.coerce.string().optional(),
    mastodonUrl: z.string().url().optional(),
    devtoId: z.coerce.string().optional(),
    devtoUrl: z.string().url().optional(),
    /** Original Gaze photo id when imported. */
    gazeId: z.string().optional(),
    weekOf: z.string().optional(),
  }),
})

export const collections = {
  blog,
}
