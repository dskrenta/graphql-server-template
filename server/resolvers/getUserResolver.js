'use strict'

const getUserById = require('../models/getUserById')

async function getUserResolver({
  pool,
  args: {
    userId
  }
}) {
  try {
    const getUserRes = await getUserById({ pool, userId })
    return getUserRes
  }
  catch (error) {
    console.error(error)
  }
}

module.exports = getUserResolver
