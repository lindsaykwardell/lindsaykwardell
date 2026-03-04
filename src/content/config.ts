import { z, defineCollection } from 'astro:content'
import { getShows } from '@/content/show'

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    pubDate: z.date(),
    title: z.string(),
    author: z.string(),
    image: z.string().nullable(),
    tags: z.array(z.string().optional()).optional().nullable(),
    type: z.string().nullable(),
    snippet: z.string().optional().nullable(),
    link: z.string().url().optional(),
    name: z.string().optional(),
    published: z.boolean(),
  }),
})

const show = defineCollection({
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

const GAZE_API_URL = import.meta.env.GAZE_API_URL || process.env.GAZE_API_URL
const GAZE_USER_ID = import.meta.env.GAZE_USER_ID || process.env.GAZE_USER_ID

const photo = defineCollection({
  loader: async () => {
    if (!GAZE_API_URL || !GAZE_USER_ID) {
      console.warn('GAZE_API_URL or GAZE_USER_ID not set, returning empty photo collection')
      return []
    }

    try {
      const res = await fetch(`${GAZE_API_URL}/public-photos?user_id=${GAZE_USER_ID}`)
      if (!res.ok) {
        console.error(`Failed to fetch photos: ${res.status} ${res.statusText}`)
        return []
      }
      const data = await res.json()
      return data.photos.map((p: any) => ({
        id: p.id,
        url: p.url,
        alt: p.description || '',
        tags: [p.word].filter(Boolean),
        week_of: p.week_of,
        created_at: p.created_at,
      }))
    } catch (err) {
      console.error('Error fetching photos from Gaze:', err)
      return []
    }
  },
  schema: z.object({
    url: z.string(),
    alt: z.string(),
    tags: z.array(z.string()),
    week_of: z.string(),
    created_at: z.string(),
  }),
})

export const collections = {
  blog,
  show,
  photo,
}
