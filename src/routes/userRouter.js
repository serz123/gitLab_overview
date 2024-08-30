/**
 * @file Defines the user router.
 * @module userRouter
 */

import express from 'express'
// Application modules.
import { container, TYPES } from '../config/inversify.config.js'

export const router = express.Router()

router.get('/', (req, res, next) => container.get(TYPES.UserController).index(req, res, next))
router.get('/auth', (req, res, next) => container.get(TYPES.UserController).authorize(req, res, next))
router.get('/auth/token', (req, res, next) => container.get(TYPES.UserController).getToken(req, res, next))
router.get('/logout', (req, res, next) => container.get(TYPES.UserController).logout(req, res, next))
