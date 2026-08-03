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
    // Personal | Programming | Poetry | Fiction | Photo | Podcast | Video | Meetup | Conference
    type: z.string().nullable(),
    snippet: z.string().optional().nullable(),
    // External episode / talk / guest post URL
    link: z.string().url().optional(),
    // Show / series name for appearances
    name: z.string().optional(),
    host: z.boolean().optional(),
    // Hidden in prod; not published to AT Proto
    draft: z.boolean().optional(),
    // false = skip social announce (document publish still ok)
    syndicate: z.boolean().optional(),
    atUri: z.string().optional(),
    blueskyUri: z.string().optional(),
    blueskyUrl: z.string().url().optional(),
    mastodonId: z.coerce.string().optional(),
    mastodonUrl: z.string().url().optional(),
    devtoId: z.coerce.string().optional(),
    devtoUrl: z.string().url().optional(),
    buttondownId: z.coerce.string().optional(),
    gazeId: z.string().optional(),
    weekOf: z.string().optional(),
  }),
})

export const collections = {
  blog,
}
