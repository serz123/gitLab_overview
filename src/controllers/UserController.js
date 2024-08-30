/**
 * @file Defines the UserController class.
 * @module UserController
 * @author Vanja Maric
 */
import { UserService } from '../services/UserService.js'

/**
 * Encapsulates a controller.
 */
export class UserController {
  /**
   * The service.
   *
   * @type {UserService}
   */
  #service

  /**
   * Initializes a new instance.
   *
   * @param {UserService} service - A service instantiated from a class with the same capabilities as UserService.
   */
  constructor (service) {
    console.log(service)
    this.#service = service
  }

  /**
   * Renders a view and sends the rendered HTML string as an HTTP response.
   * index GET.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  index (req, res, next) {
    res.render('user/login')
  }

  /**
   * Redirects the user to GitLab for authorization if not already logged in.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async authorize (req, res, next) {
    if (!req.session.user) {
      try {
        const gitlabAuthURL = 'https://gitlab.lnu.se/oauth'
        const gitLabCodeAuthURL = `${gitlabAuthURL}/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${process.env.REDIRECT_URI}`
        res.redirect(gitLabCodeAuthURL)
      } catch (error) {
        next(error)
      }
    } else {
      res.redirect('../')
    }
  }

  /**
   * Obtains user token and ID from GitLab.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getToken (req, res, next) {
    try {
      const user = await this.#service.fetchUserInfo(req.query.code)

      // WHAT SHOULD I SAVE IN SESSION?
      // USER ID AND TOKEN - KRYPTERAD?
      req.session.regenerate((err) => {
        if (err) {
          throw new Error('Failed to re-generate session.')
        }

        req.session.user = user

        // Redirect
        res.redirect('../../')
      })
    } catch (error) {
      res.redirect('../../')
    }
  }

  /**
   * Logs out the user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async logout (req, res) {
    try {
      req.session.destroy((err) => {
        if (err) {
          throw new Error('Something went wrong.')
        }
        res.redirect('../')
      })
    } catch (err) {
      res.redirect('../')
    }
  }
}
