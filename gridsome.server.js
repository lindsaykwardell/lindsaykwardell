// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const fetcher = require("graphql-fetch");

const githubOptions = {
  token: "1841e70d2d0c3f2602b24b3e5668ac99fb49dabd",
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
    `
};

class GitHubSource {
  static defaultOptions = {
    token: null,
    variables: {},
    graphQLQuery: `query {}`
  };

  url = "https://api.github.com/graphql";

  constructor(api, options) {
    const { token, variables, graphQLQuery } = {
      ...this.defaultOptions,
      ...options
    };

    if (!token) throw new Error("Missing GitHub API token!");

    api.loadSource(async actions => {
      const {data} = await this.fetchFromGitHub(token, graphQLQuery, variables)

      actions.addMetadata("githubData", data)
    })
  }

  fetchFromGitHub = (
    token,
    graphQLQuery,
    variables
  ) => {
    const fetch = fetcher(this.url);
    return this.fetchJSON(fetch, token, graphQLQuery, variables);
  };
  
  fetchJSON = async (fetch, token, query, variables) => {
    const headers = new Headers();
    headers.set("Authorization", `Bearer ${token}`);
    return await fetch(query, variables, {
      headers,
      method: "POST",
      mode: "cors"
    });
  }
}

module.exports = function(api) {
  api.loadSource(({ addCollection, addSchemaResolvers }) => {
    // new GitHubSource(api, githubOptions);
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    addSchemaResolvers({
      Post: {
        excerpt(obj) {
          var longText = obj.content.length > 300 ? "..." : "";
          return obj.content.substring(0, 300) + longText;
          // return obj.content.replace(/^(.{200}[^\s]*).*/, "$1"+longText);
        }
      }
    });
  });

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  });
};


