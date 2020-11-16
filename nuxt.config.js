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
      { hid: 'description', name: 'description', content: '' },
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
    },
  },
  fontawesome: {
    icons: {
      brands: true,
    },
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
  telemetry: true,
}
