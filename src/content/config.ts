import { z, defineCollection } from 'astro:content'
import { getShows } from '@/content/show'

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    pubDate: z.date(),
    title: z.string(),
    author: z.string(),
    image: z.string(),
    tags: z.array(z.string()).optional(),
    type: z.string().optional(),
    snippet: z.string().optional(),
    link: z.string().url().optional(),
    name: z.string().optional(),
  }),
})

const showCollection = defineCollection({
  loader: async () => {
    const shows = await getShows()
    return shows
  },
  schema: z.object({
    id: z.string(),
    url: z.string(),
    title: z.string(),
    snippet: z.string(),
    pubDate: z.date(),
    image: z.string(),
    type: z.string(),
    host: z.boolean(),
    name: z.string(),
  }),
})

export const collections = {
  blog: blogCollection,
  show: showCollection,
}
