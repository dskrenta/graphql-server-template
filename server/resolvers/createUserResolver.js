'use strict'

const createUser = require('../models/createUser')
const createPayload = require('../utils/createPayload')

async function createUserResolver({
  pool,
  args: {
    user
  }
}) {
  try {
    const createUserRes = await createUser({ pool, user })

    if (createUserRes) {
      return {
        user: createUserRes,
        token: createPayload(user),
        success: true
      }
    }

    return {
      success: false,
      message: 'Create user failed, please try again'
    }
  }
  catch (error) {
    console.error('createUserResolver error', error)
  }
}

module.exports = createUserResolver
