'use strict'

const { PRODUCTION } = require('./constants')

// If development use environment variables from .env
if (!PRODUCTION) {
  require('dotenv').config({path: `${__dirname}/../../.env`});
}

const { Client } = require('pg')

function pgClient() {
  const client = new Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
  })

  client.connect()

  return client
}

module.exports = pgClient
