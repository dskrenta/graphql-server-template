'use strict'

const jwt = require('jwt-simple')

const { PRODUCTION } = require('./constants')

// If development use environment variables from server/.env
if (!PRODUCTION) {
  require('dotenv').config({path: `${__dirname}/../../.env`})
}

function getPayload(token) {
  try {
    return jwt.decode(token, process.env.JWT_SECRET)
  }
  catch (error) {
    return null
  }
}

module.exports = getPayload
