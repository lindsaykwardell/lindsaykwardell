import Parser from 'rss-parser'
import naturalOrder from 'natural-order'

const parser = new Parser()

export async function handler(event, context) {
  try {
    const [vov, modernWeb, sit] = await Promise.all([
      parser
        .parseURL('https://feeds.feedwrench.com/views-on-vue.rss')
        .catch(() => ({
          items: [],
        })),
      parser
        .parseURL('https://feed.podbean.com/modernweb/feed.xml')
        .catch(() => ({
          items: [],
        })),
      parser
        .parseURL('https://feeds.feedwrench.com/shesintech.rss')
        .catch(() => ({
          items: [],
        })),
    ])

    return {
      statusCode: 200,
      body: JSON.stringify(
        naturalOrder([
          ...vov.items
            .filter((episode) => episode.contentSnippet.includes('Lindsay'))
            .map((episode) => ({
              ...episode,
              image: vov.itunes.image,
              snippet: episode.contentSnippet.split('\n')[0],
            })),
          ...modernWeb.items
            .filter((episode) => episode.contentSnippet.includes('Lindsay'))
            .map((episode) => ({
              ...episode,
              image: modernWeb.image?.url,
              snippet: episode.contentSnippet.split('\n')[0],
            })),
          ...sit.items
            .filter((episode) => episode.contentSnippet.includes('Lindsay'))
            .map((episode) => ({
              ...episode,
              image: sit.itunes.image,
              snippet: episode.contentSnippet.split('\n')[0],
            })),
        ])
          .orderBy('desc')
          .sort(['pubDate'])
      ),
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}
