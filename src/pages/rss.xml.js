import rss from '@astrojs/rss';
import details from '../api/details.mjs';
import naturalOrder from 'natural-order';

const items = import.meta.glob('./blog/**/*.md', { eager: true })
const posts = naturalOrder(Object.values(items)
  .filter(post => !post.frontmatter.layout.includes("External"))
  .map(post => ({
    link: post.url,
    title: post.frontmatter.title,
    pubDate: post.frontmatter.pubDate
  }))).orderBy('desc').sort(['pubDate'])

export const get = () => rss({
  // `<title>` field in output xml
  title: details.title,
  // `<description>` field in output xml
  description: details.description,
  // base URL for RSS <item> links
  site: details.permalink,
  // list of `<item>`s in output xml
  // simple example: generate items for every md file in /src/pages
  // see "Generating items" section for required frontmatter and advanced use cases
  items: posts,
  // (optional) inject custom xml
  customData: `<language>en-us</language>`,
});