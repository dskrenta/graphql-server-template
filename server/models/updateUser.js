'use strict'

const getUserById = require('./getUserById')

async function updateUser({
  pool,
  userId,
  updateUser
}) {
  const client = await pool.connect()

  try {
    const currentUser = await getUserById({ pool, userId })

    if (currentUser) {
      const updateUserQuery = {
        text: 'UPDATE "users" SET "name" = $1, "email" = $2 WHERE "id" = $3 RETURNING *',
        values: [
          updateUser.name || currentUser.name,
          updateUser.email || currentUser.email,
          userId
        ]
      }

      const res = await client.query(updateUserQuery)

      if (res.rows.length > 0) {
        return res.rows[0]
      }
    }

    return null
  }
  catch (error) {
    console.error(error)

    return null
  }
  finally {
    client.release()
  }
}

module.exports = updateUser
