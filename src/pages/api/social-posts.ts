import type { APIRoute } from 'astro'

const MASTODON_API = 'https://mastodon.social/api/v1'
const MASTODON_ACCOUNT_ID = '109248168582410861'
const BSKY_API = 'https://public.api.bsky.app/xrpc/'
const BSKY_HANDLE = 'lindsaykwardell.com'

type UnifiedPost = {
  platform: 'mastodon' | 'bluesky'
  id: string
  avatar: string
  username: string
  userPage: string
  url: string
  createdAt: string
  displayName: string
  content: string
  postStats?: {
    repliesCount: number
    reblogsCount: number
    favouritesCount: number
  }
  attachments?: Array<{
    url: string
    description: string
  }>
  card?: {
    title: string
    description: string
    url: string
    image: string
  }
}

const getAttachments = (embed: any) => {
  const attachments: Array<{ url: string; description: string }> = []

  if (embed?.images) {
    attachments.push(
      ...embed.images.map((img: any) => ({
        url: img.fullsize,
        description: img.alt || '',
      })),
    )
  }

  if (embed?.media?.images) {
    attachments.push(
      ...embed.media.images.map((img: any) => ({
        url: img.fullsize,
        description: img.alt || '',
      })),
    )
  }

  if (embed?.video) {
    attachments.push({
      url: embed.video.thumbnail || embed.video.playlist,
      description: embed.video.alt || '',
    })
  }

  if (embed?.media?.video) {
    attachments.push({
      url: embed.media.video.thumbnail || embed.media.video.playlist,
      description: embed.media.video.alt || '',
    })
  }

  return attachments.length > 0 ? attachments : undefined
}

const getCard = (embed: any) => {
  const external = embed?.external || embed?.media?.external
  if (external) {
    return {
      title: external.title,
      description: external.description,
      url: external.uri,
      image: external.thumb,
    }
  }
  return undefined
}

export const GET: APIRoute = async ({ url }) => {
  const before = url.searchParams.get('before') // ISO date string
  const beforeDate = before ? new Date(before) : new Date()

  // Calculate 6 months before
  const sixMonthsAgo = new Date(beforeDate)
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

  let bskyPosts: UnifiedPost[] = []
  let mastodonPosts: UnifiedPost[] = []

  // Fetch Bluesky posts
  try {
    let cursor: string | undefined
    let keepFetching = true

    while (keepFetching) {
      const bskyUrl = `${BSKY_API}app.bsky.feed.getAuthorFeed?actor=${BSKY_HANDLE}&limit=100&filter=posts_no_replies${cursor ? `&cursor=${cursor}` : ''}`
      const bskyFeed = await fetch(bskyUrl).then((res) => res.json())

      const posts = bskyFeed.feed
        ?.filter((item: any) => !item.reason)
        .map((item: any) => {
          const post = item.post
          const postId = post.uri.split('/').pop()

          let content = post.record.text || ''
          content = content
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
          content = content.replace(/\n/g, '<br>')
          content = content.replace(
            /(https?:\/\/[^\s<]+)/g,
            '<a href="$1" target="_blank" rel="noopener">$1</a>',
          )

          return {
            platform: 'bluesky' as const,
            id: postId,
            avatar: post.author.avatar,
            username: post.author.handle,
            userPage: `https://bsky.app/profile/${post.author.handle}`,
            url: `https://bsky.app/profile/${post.author.handle}/post/${postId}`,
            createdAt: post.record.createdAt,
            displayName: post.author.displayName || post.author.handle,
            content: `<p>${content}</p>`,
            postStats: {
              repliesCount: post.replyCount || 0,
              reblogsCount: post.repostCount || 0,
              favouritesCount: post.likeCount || 0,
            },
            attachments: getAttachments(post.embed),
            card: getCard(post.embed),
          }
        }) || []

      // Filter to the time range
      const filteredPosts = posts.filter((post: UnifiedPost) => {
        const postDate = new Date(post.createdAt)
        return postDate < beforeDate && postDate >= sixMonthsAgo
      })

      bskyPosts.push(...filteredPosts)

      // Check if we should keep fetching
      const oldestPost = posts[posts.length - 1]
      if (!oldestPost || new Date(oldestPost.createdAt) < sixMonthsAgo) {
        keepFetching = false
      } else {
        cursor = bskyFeed.cursor
        if (!cursor) keepFetching = false
      }

      // Safety limit
      if (bskyPosts.length > 200) keepFetching = false
    }
  } catch (error) {
    console.error('Error fetching Bluesky posts:', error)
  }

  // Fetch Mastodon posts
  try {
    let maxId: string | undefined
    let keepFetching = true

    while (keepFetching) {
      const mastodonUrl = `${MASTODON_API}/accounts/${MASTODON_ACCOUNT_ID}/statuses?exclude_reblogs=true&limit=100${maxId ? `&max_id=${maxId}` : ''}`
      const mastodonStatuses = await fetch(mastodonUrl).then((res) => res.json())

      const posts = mastodonStatuses.map((item: any) => ({
        platform: 'mastodon' as const,
        id: item.id,
        avatar: item.account.avatar,
        username: item.account.username,
        userPage: item.account.url,
        url: item.url,
        createdAt: item.created_at,
        displayName: item.account.display_name,
        content: item.content,
        postStats: {
          repliesCount: item.replies_count,
          reblogsCount: item.reblogs_count,
          favouritesCount: item.favourites_count,
        },
        attachments: item.media_attachments?.map((a: any) => ({
          url: a.url,
          description: a.description || '',
        })),
        card: item.card
          ? {
              title: item.card.title,
              description: item.card.description,
              url: item.card.url,
              image: item.card.image,
            }
          : undefined,
      }))

      // Filter to the time range
      const filteredPosts = posts.filter((post: UnifiedPost) => {
        const postDate = new Date(post.createdAt)
        return postDate < beforeDate && postDate >= sixMonthsAgo
      })

      mastodonPosts.push(...filteredPosts)

      // Check if we should keep fetching
      const oldestPost = posts[posts.length - 1]
      if (!oldestPost || new Date(oldestPost.createdAt) < sixMonthsAgo) {
        keepFetching = false
      } else {
        maxId = oldestPost.id
      }

      // Safety limit
      if (mastodonPosts.length > 200) keepFetching = false
    }
  } catch (error) {
    console.error('Error fetching Mastodon posts:', error)
  }

  // Merge and sort
  const allPosts = [...bskyPosts, ...mastodonPosts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  return new Response(JSON.stringify({
    posts: allPosts,
    oldestDate: allPosts.length > 0 ? allPosts[allPosts.length - 1].createdAt : null
  }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
