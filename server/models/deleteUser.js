'use strict'

async function deleteUser({
  pool,
  userId
}) {
  const client = await pool.connect()

  try {
    const deleteUserQuery = {
      text: 'DELETE FROM "users" where "id" = $1',
      values: [userId]
    }

    const res = await client.query(deleteUserQuery)

    if (res.rowCount > 0) {
      return true
    }

    return false
  }
  catch (error) {
    console.error(error)

    return null
  }
  finally {
    client.release()
  }
}

module.exports = deleteUser
