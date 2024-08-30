// User-land modules.
import { Container, decorate, inject, injectable } from 'inversify'
import 'reflect-metadata'

// Application modules.
import { GitLabService } from '../services/GitLabService.js'
import { UserService } from '../services/UserService.js'
import { GitLabController } from '../controllers/GitLabController.js'
import { UserController } from '../controllers/UserController.js'

// Define the types to be used by the IoC container.
export const TYPES = {
  GitLabService: Symbol.for('GitLabService'),
  UserService: Symbol.for('UserService'),
  GitLabController: Symbol.for('GitLabController'),
  UserController: Symbol.for('UserController')
}

// Declare the injectable and its dependencies.
decorate(injectable(), UserController)
decorate(injectable(), GitLabController)
decorate(injectable(), UserService)
decorate(injectable(), GitLabService)

decorate(inject(TYPES.UserService), UserController, 0)
decorate(inject(TYPES.GitLabService), GitLabController, 0)

// Create the IoC container.
export const container = new Container()

// Declare the bindings.
container.bind(TYPES.GitLabService).to(GitLabService).inSingletonScope()
container.bind(TYPES.UserService).to(UserService).inSingletonScope()
container.bind(TYPES.GitLabController).to(GitLabController).inSingletonScope()
container.bind(TYPES.UserController).to(UserController).inSingletonScope()
