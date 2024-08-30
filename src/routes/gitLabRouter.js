/**
 * @file Defines the gitLab router.
 * @module gitLabRouter
 */

import express from 'express'

// Application modules.
import { container, TYPES } from '../config/inversify.config.js'

export const router = express.Router()

router.get('/profile', (req, res, next) => container.get(TYPES.GitLabController).profile(req, res, next))
router.get('/activities', (req, res, next) => container.get(TYPES.GitLabController).activities(req, res, next))
router.get('/groups', (req, res, next) => container.get(TYPES.GitLabController).groups(req, res, next))
