/**
 * @file Defines the GitLabService class.
 * @module GitLabService
 */
import { fetchData } from './RESTKit.js'
import { fetchGroupsInfo } from './GraphQLKit.js'

/**
 * Encapsulates a service.
 */
export class GitLabService {
  /**
   * Retrieves information about the user from GitLab.
   *
   * @param {string} token - GitLab access token.
   * @returns {Promise<object>} - User information object.
   */
  async getUserInformation (token) {
    const getUserUrl = `https://gitlab.lnu.se/api/v4/user?access_token=${token}`
    const userData = await fetchData(getUserUrl)

    const userGitlabInfo = {
      name: userData.name,
      username: userData.username,
      userid: userData.id,
      email: userData.email,
      avatar_url: userData.avatar_url,
      lastactivity: userData.last_activity_on
    }

    return userGitlabInfo
  }

  /**
   * Retrieves user activities from GitLab.
   *
   * @param {string} token - GitLab access token.
   * @param {string} userid - User ID.
   * @returns {Promise<object[]>} - Array of user activities.
   */
  async getActivities (token, userid) {
    const getActivitiesUrl = `https://gitlab.lnu.se/api/v4/users/${userid}/events?per_page=101&access_token=${token}`
    let activities = await fetchData(getActivitiesUrl)

    // Add last ofo 101 activities
    const getActivitiesUrlPage2 = `https://gitlab.lnu.se/api/v4/users/${userid}/events?per_page=1&page=101
    &access_token=${token}`

    const page2activity = await fetchData(getActivitiesUrlPage2)
    activities.push(page2activity[0])

    activities = activities.map(activity => ({
      actionName: activity.action_name,
      createdAt: activity.created_at.replace('T', ' ').substring(0, 19),
      targetTitle: activity.target_title,
      targetType: activity.target_type
    }))

    return activities
  }

  /**
   * Retrieves information about GitLab groups.
   *
   * @param {string} token - GitLab access token.
   * @returns {Promise<object>} - Group information object.
   */
  async getGroupsInfo (token) {
    const allInfoAboutGroups = await fetchGroupsInfo(token)
    console.log(allInfoAboutGroups.currentUser.groups.nodes)

    const groupsData = allInfoAboutGroups.currentUser.groups.nodes.map(group => ({
      name: group.name,
      webUrl: group.webUrl,
      avatarUrl: this.#makeAbsoluteUrl(group.avatarUrl),
      path: group.path,
      projects: group.projects?.nodes.map(project => ({
        name: project.name,
        webUrl: project.webUrl,
        avatarUrl: this.#makeAbsoluteUrl(project.avatarUrl),
        path: project.path,
        lastCommitDate: project.repository.tree.lastCommit.committedDate.replace('T', ' ').substring(0, 19) || null,
        lastCommitAuthorName: project.repository.tree.lastCommit?.author.name || null,
        lastCommitAuthorUsername: project.repository.tree.lastCommit?.author.username || null,
        lastCommitAuthorAvatarUrl: this.#makeAbsoluteUrl(project.repository.tree.lastCommit?.author.avatarUrl) || null
      })) || null,
      projectHasNextPage: group.projects.pageInfo.hasNextPage
    }))
    const hasNextPageGroups = allInfoAboutGroups.currentUser.groups.pageInfo.hasNextPage

    const groupsInfo = {
      groups: groupsData,
      hasNextPage: hasNextPageGroups
    }

    return groupsInfo
  }

  /**
   * Makes a URL absolute if it's not already.
   *
   * @private
   * @param {string} url - URL to be made absolute.
   * @returns {string} - Absolute URL.
   */
  #makeAbsoluteUrl (url) {
    const baseUrl = 'https://gitlab.lnu.se'
    if (url && !url.startsWith('https://')) {
      url = baseUrl + '/' + url
    }
    return url
  }
}
