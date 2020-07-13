const { gql } = require('apollo-server-express')

const typeDefs = gql`
  scalar Date

  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: Date!
  }

  type UserAuth {
    token: String
    user: User
    success: Boolean!
  }

  type GenericResponse {
    success: Boolean!
    message: String
  }

  input CreateUserInput {
    name: String!
    email: String!
  }

  type Query {
    getUser(userId: ID!): User!
  }

  type Mutation {
    createUser(user: CreateUserInput!): UserAuth!
    updateUser(userId: ID!, updateUser: CreateUserInput!): UserAuth!
    deleteUser(userId: ID!): GenericResponse!
  }
`

module.exports = typeDefs
