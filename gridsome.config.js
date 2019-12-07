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
        token: process.env.GRIDSOME_GITHUB_API_TOKEN,
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
      use: "gridsome-plugin-flexsearch",
      options: {
        collections: [
          {
            typeName: "Post",
            indexName: "Post",
            fields: ["title", "content", "tags", "author", "date"],
          },
        ],
        searchFields: ["title", "tags"],
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
