export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',
  mode: 'universal',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Lindsay Wardell',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Personal site and blog of Lindsay Wardell, Developer and IT Consultant',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Lato|Rokkitt|Fira+Sans&display=swap',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/viewsonvue.server.js',
    '~/plugins/vue-formulate.js',
    '~/plugins/devto.js',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome',
    '@nuxtjs/color-mode',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    [
      'nuxt-github-api',
      {
        token: process.env.GITHUB_API_TOKEN,
        graphQLQuery: `
          query {
            user(login:"lindsaykwardell"){
              name
              bio
              isHireable
              url
              avatarUrl
              pinnedItems(first:6,types:[REPOSITORY]) {
                nodes{
                  ... on Repository {
                    name
                    url
                    description
                    stargazerCount
                    licenseInfo{
                      name
                    }
                    primaryLanguage {
                      color
                      name
                    }
                  }
                }
              }
              repositories(first:6, orderBy:{
                field:UPDATED_AT, direction: DESC
              }){
                nodes{
                  name
                  url
                  description
                  stargazerCount
                  licenseInfo{
                    name
                  }
                  primaryLanguage {
                    color
                    name
                  }
                }
              }
            }
          }
          `,
      },
    ],
    // 'nuxt-lazy-load',
    '@nuxtjs/feed',
  ],

  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {
    liveEdit: true,
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-material-oceanic.css',
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    postcss: {
      plugins: {
        autoprefixer: {},
        cssnano: {
          preset: 'default',
        },
        'postcss-nested': {},
      },
      preset: {
        features: {
          // Fixes: https://github.com/tailwindcss/tailwindcss/issues/1190#issuecomment-546621554
          'focus-within-pseudo-class': false,
        },
      },
    },
  },
  fontawesome: {
    icons: {
      brands: true,
      solid: ['faSun', 'faMoon', 'faRssSquare'],
    },
  },
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'dark', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
  },
  generate: {
    async routes() {
      const { $content } = require('@nuxt/content')

      const posts = await $content(`posts`).sortBy('date', 'desc').fetch()

      return posts.map((post) => ({
        route: `/blog${post.slug}`,
        payload: post,
      }))
    },
  },
  feed() {
    const baseUrlPosts = 'https://lindsaykwardell.com'
    const baseLinkFeedArticles = '/feed'
    const feedFormats = {
      rss: { type: 'rss2', file: 'rss.xml' },
      json: { type: 'json1', file: 'feed.json' },
    }
    const { $content } = require('@nuxt/content')

    const createFeedArticles = async function (feed) {
      feed.options = {
        title: 'Lindsay Wardell - All Posts',
        description: 'All posts by Lindsay Wardell',
        link: baseUrlPosts,
      }
      const posts = await $content('posts').sortBy('date', 'desc').fetch()

      posts.forEach((post) => {
        const url = `${baseUrlPosts}/blog${post.slug}`

        feed.addItem({
          title: post.title,
          id: url,
          link: url,
          date: new Date(post.date),
          description: post.excerpt,
          content: childrenToString(post.body.children),
        })
      })
    }

    return Object.values(feedFormats).map(({ file, type }) => ({
      path: `${baseLinkFeedArticles}/${file}`,
      type: type,
      create: createFeedArticles,
    }))
  },
  telemetry: true,
}

const childrenToString = ([head, ...tail] = [], str = '') => {
  if (!head) return str

  const newStr = head.type === 'text' ? str + head.value : str

  if (head.children)
    return childrenToString(tail, childrenToString(head.children, newStr))
  else return childrenToString(tail, newStr)
}
