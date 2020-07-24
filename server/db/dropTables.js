'use strict'

const pgClient = require('../utils/pgClient')

const dropTablesQuery = `
  DROP TABLE IF EXISTS "users";
`

async function dropTables() {
  try {
    const client = pgClient()
    
    const res = await client.query(dropTablesQuery)

    console.log(res)
  }
  catch (error) {
    console.error('dropTables error', error)
  }
}

dropTables()
