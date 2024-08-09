import { z, defineCollection } from "astro:content";

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
    })
})

export const collections = {
    'blog': blogCollection
}