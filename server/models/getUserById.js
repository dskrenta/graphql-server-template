'use strict'

async function getUserById({
  pool,
  userId
}) {
  const client = await pool.connect()

  try {
    const getUserQuery = {
      text: 'SELECT * FROM "users" WHERE "id" = $1',
      values: [userId]
    }

    const res = await client.query(getUserQuery)

    if (res.rows.length > 0) {
      return res.rows[0]
    }

    return null
  }
  catch (error) {
    console.error('getUserById model error', error)

    return null
  }
  finally {
    client.release()
  }
}

module.exports = getUserById
