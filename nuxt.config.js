const fs = require('fs').promises
const path = require('path')

const constructFeedItem = async (post, dir, hostname) => {
  //note the path used here, we are using a dummy page with an empty layout in order to not send that data along with our other content
  const filePath = path.join(__dirname, `dist/blog/${post.slug}/index.html`)
  const content = await fs.readFile(filePath, 'utf8')
  const url = `${hostname}/blog${post.slug}`
  return {
    title: post.title,
    id: url,
    link: url,
    date: new Date(post.date),
    description: post.snippet,
    content: childrenToString(post.body.children),
  }
}

const create = async (feed, args) => {
  const [filePath, ext] = args
  const hostname = 'https://lindsaykwardell.com'
  feed.options = {
    title: 'Lindsay Wardell - All Posts',
    description: 'All posts by Lindsay Wardell',
    link: hostname,
  }
  const { $content } = require('@nuxt/content')

  const posts = await $content('posts').sortBy('date', 'desc').fetch()

  for (const post of posts) {
    const feedItem = await constructFeedItem(post, filePath, hostname)
    feed.addItem(feedItem)
  }
  return feed
}

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',
  privateRuntimeConfig: {
    githubApiToken: process.env.GITHUB_API_TOKEN || process.env.GITHUB_TOKEN
  },
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
    script: [
      { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/podcasts.js',
    '~/plugins/devto.js',
    '~/plugins/opti-image.js',
    '~/plugins/posts.js'
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
    'nuxt-github-api',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/feed',
    '@nuxtjs/sitemap',
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
  githubApi: {
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
  tailwindcss: {
    jit: true
  },
  fontawesome: {
    icons: {
      brands: ['faTwitter', 'faDev', 'faLinkedin', 'faGithub'],
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
  pwa: {
    icon: false,
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
  feed: [
    {
      path: '/rss.xml',
      create,
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
      data: ['posts', 'xml'],
    },
  ],
  sitemap: {
    hostname: 'https://lindsaykwardell.com',
    gzip: true,
    routes: async () => {
      let routes = []
      const { $content } = require('@nuxt/content')
      let posts = await $content('posts').fetch()
      for (const post of posts) {
        routes.push(`blog/${post.slug}`)
      }
      return routes
    },
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
