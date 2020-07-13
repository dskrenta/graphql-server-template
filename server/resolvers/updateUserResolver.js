'use strict'

const updateUser = require('../models/updateUser')
const createPayload = require('../utils/createPayload')

async function updateUserResolver({
  pool,
  args: {
    userId,
    updateUser
  }
}) {
  try {
    const updateUserRes = await updateUser({ pool, userId, updateUser })

    if (updateUserRes) {
      return {
        success: true,
        user: updateUserRes,
        token: createPayload(updateUserRes)
      }
    }

    return {
      success: false,
      message: 'Update user failed, please try again'
    }
  }
  catch (error) {
    console.error('updateUserResolver error', error)
  }
}

module.exports = updateUserResolver
