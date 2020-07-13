'use strict'

const jwt = require('jwt-simple')

const { PRODUCTION } = require('./constants')

// If development use environment variables from .env
if (!PRODUCTION) {
  require('dotenv').config({path: `${__dirname}/../../.env`})
}

function createPayload(data) {
  try {
    return jwt.encode(data, process.env.JWT_SECRET)
  }
  catch (error) {
    return null
  }
}

module.exports = createPayload
