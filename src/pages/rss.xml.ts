import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getCollection } from 'astro:content'
import sanitizeHtml from 'sanitize-html'
import MarkdownIt from 'markdown-it'
const parser = new MarkdownIt()

import details from '@/api/details.json'

export async function GET(context: APIContext) {
  const posts = await getCollection('blog')
  return rss({
    // `<title>` field in output xml
    title: details.title,
    // `<description>` field in output xml
    description: details.description,
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: details.permalink,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: posts
      .toSorted((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
      .map((post) => ({
        link: post.data.link ?? `/blog/${post.slug}`,
        title: post.data.title,
        content: sanitizeHtml(parser.render(post.body), {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat([
            'img',
            'br',
            'p',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'blockquote',
            'pre',
            'code',
            'em',
            'strong',
            'ul',
            'ol',
            'li',
            'a',
          ]),
        }),
        pubDate: post.data.pubDate,
      })),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
    stylesheet: '/rss/styles.xsl',
  })
}
