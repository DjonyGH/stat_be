const express = require('express')
require('dotenv').config()
const sequelize = require('./db')
const models = require('./models/index')
// const issuerRouter = require('./routes/issuer.routes')
// const tradingRouter = require('./routes/trading.routes')

const PORT = process.env.PORT || 8080

const app = express()

app.use(express.json())
// app.use('/api', issuerRouter)
// app.use('/api', tradingRouter)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`Server has been started on port: ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

start()
