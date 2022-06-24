const gql = async (url, query, variables, options) => {
    const res = await fetch(url, {
      ...options,
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!res.ok) throw new Error(JSON.stringify(await res.json(), null, 4));
  
    const body = await res.json();
  
    if (body.errors) throw new Error(JSON.stringify(body.errors));
  
    return body;
  };
  
  const url = "https://api.github.com/graphql";
  
  export const fetchFromGitHub = async (graphQLQuery) => {
    const Authorization =  `Bearer ${
        import.meta.env.PUBLIC_GITHUB_API_TOKEN
      }`

    return (
      await gql(url, graphQLQuery, undefined, {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization,
        },
      })
    ).data;
  };
  
  export const getData = () => fetchFromGitHub(`
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
      repositories(first:100, orderBy:{
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
  `) 
      