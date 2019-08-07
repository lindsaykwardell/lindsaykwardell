require("dotenv").config({
  // path: `.env.${process.env.NODE_ENV}`,
  path: `.env`,
})

module.exports = {
  proxy: {
    prefix: "/.netlify/functions",
    url: "http://localhost:9000",
  },
  siteMetadata: {
    title: `Lindsay Wardell`,
    description: `Blog and Portfolio`,
    author: `Lindsay Wardell`,
    siteUrl: `https://lindsaykwardell.com`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Lindsay Wardell`,
        short_name: `lindsaykwardell`,
        start_url: `/`,
        background_color: `rgb(240, 241, 242)`,
        theme_color: `rgb(39, 41, 43)`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`,
      },
    },
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        google: {
          families: ["Rokkitt", "Lato"],
        },
      },
    },
    {
      resolve: `gatsby-source-github-api`,
      options: {
        token: process.env.GATSBY_GITHUB_TOKEN,
        variables: {},
        graphQLQuery: `
          query {
            user(login:"lindsaykwardell"){
              name
              bio
              bioHTML
              isHireable
              location
              url
              avatarUrl
              repositories(first:6, orderBy:{
                field:UPDATED_AT, direction: DESC
              }){
                nodes{
                  name
                  url
                  description
                  isFork
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
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 900,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                  guid: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      frontmatter {
                        path
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Lindsay Wardell - All Posts",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            // match: "^/blog/",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GATSBY_GOOGLE_ANALYTICS,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    {
      resolve: "gatsby-plugin-load-script",
      options: {
        disable: !process.env.GATSBY_SENTRY_DSN, // When do you want to disable it ?
        src: "https://browser.sentry-cdn.com/5.5.0/bundle.min.js",
        onLoad: `() => Sentry.init(
          { dsn: "${process.env.GATSBY_SENTRY_DSN}",
            environment: "${process.env.NODE_ENV}"
          }
        )`,
      },
    },
  ],
}
