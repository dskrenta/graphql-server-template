'use strict'

const deleteUser = require('../models/deleteUser')

async function deleteUserResolver({
  pool,
  args: {
    userId
  }
}) {
  try {
    const deleteUserRes = await deleteUserById({ pool, userId })

    if (deleteUserRes) {
      return {
        success: true
      }
    }

    return {
      success: false,
      message: 'Delete user failed, please try again'
    }
  }
  catch (error) {
    console.error('deleteUserResolver error', error)
  }
}

module.exports = deleteUserResolver
