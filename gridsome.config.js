// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const postcssNested = require("postcss-nested")
const cssnano = require("cssnano")
const tailwindcss = require("tailwindcss")

module.exports = {
  siteName: "Lindsay Wardell",
  siteDescription: "Programmer and Writer",
  templates: {
    Post: "/blog/:path",
  },
  plugins: [
    {
      use: "gridsome-source-github-api",
      options: {
        token: process.env.GITHUB_API_TOKEN,
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
      use: "gridsome-plugin-typescript",
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "src/content/posts/**/*.md",
        typeName: "Post",
      },
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "src/content/comments/**/*.md",
        typeName: "Comment",
      },
    },
    {
      use: "gridsome-plugin-rss",
      options: {
        contentTypeName: "Post",
        feedOptions: {
          title: "Lindsay Wardell",
          description: "Blog and Portfolio",
          feed_url: "https://lindsaykwardell.com/rss.xml",
          site_url: "https://lindsaykwardell.com",
        },
        feedItemOptions: node => {
          return {
            title: node.title,
            description:
              node.content.substring(0, 300) + node.content.length > 300
                ? "..."
                : "",
            url: "https://lindsaykwardell.com" + node.path,
            author: node.author,
            date: node.date,
            custom_elements: [{ content: node.content }],
          }
        },
        output: {
          dir: "./static",
          name: "rss.xml",
        },
      },
    },
    {
      use: "gridsome-plugin-sentry",
      options: {
        dsn: process.env.NODE_ENV === "production" && process.env.SENTRY_DSN,
      },
    },
    {
      use: "@gridsome/plugin-google-analytics",
      options: {
        id: process.env.GOOGLE_ANALYTICS,
      },
    },
  ],
  css: {
    loaderOptions: {
      postcss: {
        plugins: [postcssNested, cssnano, tailwindcss],
      },
    },
  },
}
