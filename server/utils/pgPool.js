'use strict'

const { PRODUCTION } = require('./constants')

// If development use environment variables from .env
if (!PRODUCTION) {
  require('dotenv').config({path: `${__dirname}/../../.env`})
}

const { Pool } = require('pg')

function pgPool() {
  const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
  })

  pool.on('error', (error) => console.error('Postgres pool error', error))

  return pool
}

module.exports = pgPool
