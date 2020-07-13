'use strict'

const bcrypt = require('bcrypt')

const { SALT_ROUNDS } = require('../utils/constants')

async function createUser({
  pool,
  name,
  email,
  password
}) {
  const client = await pool.connect()

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    const createUserQuery = {
      text: 'INSERT INTO users("name", "email", "password") VALUES($1, $2, $3) RETURNING *',
      values: [name, email, hashedPassword]
    }

    const res = await client.query(createUserQuery)

    if (res.rows.length > 0) {
      return res.rows[0]
    }
  }
  catch (error) {
    console.error(error)

    return false
  }
  finally {
    client.release()
  }
}

module.exports = createUser
