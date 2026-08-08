const SITE_URL = 'https://lindsaykwardell.com'

/** Markdown body after YAML frontmatter. */
export function extractMarkdownBody(raw: string): string {
  const match = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n([\s\S]*)$/)
  return (match ? match[1] : raw).trim()
}

export function absolutizeSiteUrl(url: string, siteUrl = SITE_URL): string {
  const trimmed = url.trim()
  if (!trimmed || trimmed.startsWith('data:') || trimmed.startsWith('#')) {
    return trimmed
  }
  if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith('//')) {
    return trimmed
  }
  if (trimmed.startsWith('/')) return `${siteUrl}${trimmed}`
  return `${siteUrl}/${trimmed.replace(/^\.\//, '')}`
}

/** Rewrite markdown + HTML image srcs that are site-relative to absolute URLs. */
export function absolutizeMarkdownImages(
  markdown: string,
  siteUrl = SITE_URL,
): string {
  let out = markdown.replace(
    /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g,
    (_full, alt: string, src: string) =>
      `![${alt}](${absolutizeSiteUrl(src, siteUrl)})`,
  )
  out = out.replace(
    /(<img\b[^>]*\bsrc=["'])([^"']+)(["'])/gi,
    (_full, pre: string, src: string, post: string) =>
      `${pre}${absolutizeSiteUrl(src, siteUrl)}${post}`,
  )
  return out
}

/** Full-post Buttondown body: title, site link, then markdown contents. */
export function buildButtondownBody(
  title: string,
  url: string,
  markdown: string,
  siteUrl = SITE_URL,
): string {
  const content = absolutizeMarkdownImages(markdown, siteUrl)
  return [
    '<!-- buttondown-editor-mode: plaintext -->',
    `# ${title}`,
    '',
    `_[Read “${title}” on my site](${url})_`,
    '',
    content,
  ]
    .join('\n')
    .trimEnd()
}
