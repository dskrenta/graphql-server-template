'use strict'

// Constants
const {
  SERVER_PORT,
  PRODUCTION
} = require('./utils/constants')

// If development use environment variables from newco/server/.env
if (!PRODUCTION) {
  require('dotenv').config({path: `${__dirname}/.env`})
}

// External imports
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { Pool } = require('pg')
const cors = require('cors')

// Internal imports
const pgPool = require('./utils/pgPool')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const getPayload = require('./utils/getPayload')

// Server port
const PORT = process.env.PORT || SERVER_PORT

// PostgreSQL pool initialization
const pool = pgPool()

// Express initialization
const app = express()

// Cors configuration
app.use(cors())

// Initialize apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Decrypt JWT payload from GraphQL API request
    const user = getPayload(req.headers.authorization)

    // Resolver context
    return {
      user,
      pool
    }
  },
  introspection: true,
  playground: true
})

// Apply apollo server to express app
server.applyMiddleware({ app })

// Start server
app.listen({ port: PORT }, () => {
   console.log(`graphql-template-server listening on at http://localhost:${PORT}`)
})
