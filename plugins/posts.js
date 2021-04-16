import naturalOrder from 'natural-order'

export default async (context, inject) => {
  const posts = await context.$content(`posts`).sortBy('date', 'desc').fetch()
  const extPosts = await context
    .$content(`external`)
    .sortBy('date', 'desc')
    .fetch()

  const allPosts = naturalOrder([...posts, ...extPosts])
    .orderBy('desc')
    .sort(['date'])

  inject('posts', allPosts)

  context.$posts = allPosts
}
