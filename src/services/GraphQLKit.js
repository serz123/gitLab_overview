import { gql, GraphQLClient } from 'graphql-request'

/**
 * Creates a GraphQL client instance with the provided access token.
 *
 * @param {string} token - GitLab access token.
 * @returns {GraphQLClient} - GraphQL client instance.
 */
function graphQLClient (token) {
  return new GraphQLClient('https://gitlab.lnu.se/api/graphql', {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
}

/**
 * Makes a GraphQL request using the provided token, query, and variables.
 *
 * @param {string} token - GitLab access token.
 * @param {string} query - GraphQL query string.
 * @param {object} [variables={}] - Optional variables for the GraphQL query.
 * @returns {Promise<object>} - Result of the GraphQL request.
 */
async function fetchData (token, query, variables = {}) {
  return graphQLClient(token).request(query, variables)
}

/**
 * Fetches information about GitLab groups.
 *
 * @param {string} token - GitLab access token.
 * @returns {Promise<object[]>} - Information about GitLab groups.
 */
export async function fetchGroupsInfo (token) {
  const query = gql`query {
    currentUser {
        groups(first:3) {
            nodes {
                name
                webUrl
                avatarUrl
                path
                projects  (first:5, includeSubgroups: true) {
                    nodes {
                        name
                        webUrl
                        avatarUrl
                        path
                        repository {
                            tree {
                                lastCommit {
                                    committedDate
                                    author {
                                        name
                                        username
                                        avatarUrl
                                    }
                                }
                            }
                        }
                    }
                    pageInfo {
                        hasNextPage
                    }
                }
            }
            pageInfo {
                hasNextPage
            }
        }
    }
}`

  return fetchData(token, query)
}

/**
 * Fetches the user ID using the provided token.
 *
 * @param {string} token - GitLab access token.
 * @returns {Promise<object>} - User ID information.
 */
export async function fetchUserId (token) {
  const query = gql`query{ 
    currentUser 
    { 
        id
    }
  }`
  return fetchData(token, query)
}
