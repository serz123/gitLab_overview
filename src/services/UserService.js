import { fetchUserId } from './GraphQLKit.js'

/**
 * Encapsulates a service.
 */
export class UserService {
/**
 * Fetches user information from GitLab using the provided authorization code.
 *
 * @param {string} userCode - The authorization code obtained from GitLab.
 * @returns {Promise<{ token: string, id: string }>} A promise that resolves to an object containing the user's access token and ID.
 */
  async fetchUserInfo (userCode) {
    const gitlabAuthURL = 'https://gitlab.lnu.se/oauth'
    const gitlabTokenAuthUrl = `${gitlabAuthURL}/token`

    const params = {
      client_id: process.env.CLIENT_ID,
      code: userCode,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: process.env.REDIRECT_URI
    }

    const response = await fetch(gitlabTokenAuthUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })

    const data = await response.json()
    const userid = await fetchUserId(data.access_token)
    const justId = userid.currentUser.id.split('/').pop()

    const user = {
      token: data.access_token,
      id: justId
    }

    return user
  }
}
