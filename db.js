const Pool = require('pg').Pool
const pool = new Pool({
  user: "postgres",
  password: "8186pg",
  host: "localhost",
  port: 5433,
  database: "stat_db"
})

module.exports = pool