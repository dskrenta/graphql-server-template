'use strict'

const pgClient = require('../utils/pgClient')

const createTablesQuery = `
  CREATE TABLE "users" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
  );
`

async function createTables() {
  try {
    const res = await client.query(createTablesQuery)

    console.log(res)
  }
  catch (error) {
    console.error('createTables error', error)
  }
}

createTables()
