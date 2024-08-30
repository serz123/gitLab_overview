/**
 * @file Defines the GitLabController class.
 * @module GitLabController
 */

import { GitLabService } from '../services/GitLabService.js'

/**
 * Encapsulates a controller.
 */
export class GitLabController {
  /**
   * The service.
   *
   * @type {GitLabService}
   */
  #service
  /**
   * Initializes a new instance.
   *
   * @param {GitLabService} service - A service instantiated from a class with the same capabilities as GitLabService.
   */
  constructor (service) {
    this.#service = service
  }

  /**
   * Renders the user profile view.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async profile (req, res, next) {
    const userGitlabInfo = await this.#service.getUserInformation(req.session.user.token)
    res.render('gitlab/profile', { userGitlabInfo })
  }

  /**
   * Renders the activities view.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async activities (req, res, next) {
    const activities = await this.#service.getActivities(req.session.user.token, req.session.user.id)
    res.render('gitlab/activities', { activities })
  }

  /**
   * Renders the groups view.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async groups (req, res, next) {
    const groupsViewData = await this.#service.getGroupsInfo(req.session.user.token)
    res.render('gitlab/groups', { groupsViewData })
  }
}
