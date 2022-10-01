// const {Pool} = require('pg');
// const pool = new Pool({
//  connectionString: process.env.DATABASE_URL,
//  ssl: {
//  rejectUnauthorized: false
//  }
// });

// module.exports=pool;

import { Pool } from "pg";

let conn;

if (!conn) {
  conn = new Pool({
    user: process.env.PGSQL_USER,
    password: process.env.PGSQL_PASSWORD,
    host: process.env.PGSQL_HOST,
    port: process.env.PGSQL_PORT,
    database: process.env.PGSQL_DATABASE,
  });
}

export default conn ;