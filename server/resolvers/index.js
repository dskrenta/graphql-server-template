'use strict'

// External imports
const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')

// Internal imports
const generateResolver = require('../utils/generateResolver')

// Resolver imports
const getUserResolver = require('./getUserResolver')
const createUserResolver = require('./createUserResolver')
const deleteUserResolver = require('./deleteUserResolver')
const updateUserResolver = require('./updateUserResolver')

const resolvers = {
  Query: {
    getUser: generateResolver(getUserResolver),
  },

  Mutation: {
    createUser: generateResolver(createUserResolver),
    deleteUser: generateResolver(deleteUserResolver),
    updateUser: generateResolver(updateUserResolver)
  },

  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value) // value from the client
    },
    serialize(value) {
      return value.toISOString() // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10) // ast value is always in string format
      }
      return null
    }
  })
}

module.exports = resolvers
