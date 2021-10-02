const express = require('express')
const cors = require('cors')
require('dotenv').config()

const router = require('./routes/index')
const sequelize = require('./db')
const models = require('./models/index')

// const updateIssuersTable = require('./jobs/updateIssuersTable')
const updateDividendsTable = require('./jobs/updateDividendsTable')

const PORT = process.env.PORT || 8080

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`Server has been started on port: ${PORT}`))
    updateDividendsTable()
    // updateIssuersTable()
  } catch (error) {
    console.log(error)
  }
}

start()
