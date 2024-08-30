/**
 * @file This module contains the options object for the session middleware.
 * @module sessionOptions
 * @see {@link https://github.com/expressjs/session}
 */
import { createClient } from 'redis'

import RedisStore from 'connect-redis'

// Configure redis client
/**
 *
 */
function redisClient () {
  const redisClient = createClient({
    url: process.env.REDIS_URL
  })
  redisClient.connect().catch(console.error) // TODO: FIX THIS ERROR HANDLING

  redisClient.on('connect', () => console.log('Connected to redis successfully.'))
  redisClient.on('error', (err) => console.error(`Could not establish a connection with redis.: ${err}`))
  redisClient.on('end', () => console.log('Redis disconnected.'))
  return redisClient
}

// Options object for the session middleware.
export const sessionOptions = {
  name: process.env.SESSION_NAME, // Don't use default session cookie name.
  secret: process.env.SESSION_SECRET, // Change it!!! The secret is used to hash the session with HMAC.
  store: new RedisStore({ client: redisClient() }),
  resave: false, // Resave even if a request is not changing the session.
  saveUninitialized: false, // Don't save a created but not modified session.
  cookie: {
    // Exparation is as long as Gitlab tokens exparation(returned in seconds and converted in ms)
    maxAge: 7200 * 1000,
    sameSite: 'lax'
  }
}

if (process.env.NODE_ENV === 'production') {
  sessionOptions.cookie.secure = true // serve secure cookies
}

// TODO: test this
