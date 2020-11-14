import Parser from 'rss-parser'

const parser = new Parser()

export default async (context, inject) => {
  try {
    const vov = await parser.parseURL(
      'https://feeds.feedwrench.com/views-on-vue.rss'
    )

    inject('vov', vov)

    context.$vov = vov
  } catch (err) {
    // Do nothing
  }
}
