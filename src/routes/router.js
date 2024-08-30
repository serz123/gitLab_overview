/**
 * @file Defines the main router.
 * @module router
 */

import express from 'express'
import http from 'node:http'
import { router as homeRouter } from './homeRouter.js'
import { router as userRouter } from './userRouter.js'
import { router as gitLabRouter } from './gitLabRouter.js'

export const router = express.Router()

router.use('/', homeRouter)
router.use('/user', userRouter)
router.use('/gitLab', gitLabRouter)

// Catch 404 (ALWAYS keep this as the last route).
router.use('*', (req, res, next) => {
  const statusCode = 404
  const error = new Error(http.STATUS_CODES[statusCode])
  error.status = statusCode
  next(error)
})
