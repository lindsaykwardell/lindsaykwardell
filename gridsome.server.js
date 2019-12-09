// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

var proxy = require("http-proxy-middleware")

module.exports = function(api) {
  api.configureServer(app => {
    app.use(
      "/.netlify/functions/",
      proxy({
        target: "http://localhost:9000",
        pathRewrite: {
          "/.netlify/functions/": "",
        },
      })
    )
  })

  api.loadSource(({ addCollection, addSchemaResolvers }) => {
    // new GitHubSource(api, githubOptions);
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    addSchemaResolvers({
      Post: {
        excerpt(obj) {
          var longText = obj.content.length > 300 ? "..." : ""
          return obj.content.substring(0, 300) + longText
          // return obj.content.replace(/^(.{200}[^\s]*).*/, "$1"+longText);
        },
      },
    })
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
