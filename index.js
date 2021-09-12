const express = require('express')
const issuerRouter = require('./routes/issuer.routes')
const tradingRouter = require('./routes/trading.routes')

const PORT = process.env.PORT || 8080

const app = express()

app.use(express.json())
app.use('/api', issuerRouter)
app.use('/api', tradingRouter)

app.listen(PORT, () => console.log(`Server has been started on port: ${PORT}`))