const express = require('express')
const cron = require('node-cron')
var puppeteer = require('puppeteer')
require('dotenv').config()
// const sequelize = require('./db')
// const models = require('./models/index')
// const issuerRouter = require('./routes/issuer.routes')
// const tradingRouter = require('./routes/trading.routes')

const PORT = process.env.PORT || 8080

const app = express()

app.use(express.json())
// app.use('/api', issuerRouter)
// app.use('/api', tradingRouter)

const start = async () => {
  try {
    // await sequelize.authenticate()
    // await sequelize.sync()
    app.listen(PORT, () => console.log(`Server has been started on port: ${PORT}`))

    cron.schedule('* * * * *', async () => {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.goto('https://www.dohod.ru/ik/analytics/dividend/sberp')
      await page.waitForSelector('.table-title')
      const amountDividends = await page.evaluate(() =>
        Array.from(
          document.querySelectorAll('#leftside-col > table:nth-child(9) > tbody > tr:not(.forecast) > td:nth-child(4)'),
          (el) => el.innerHTML
        )
      )
      const dates = await page.evaluate(() =>
        Array.from(
          document.querySelectorAll('#leftside-col > table:nth-child(9) > tbody > tr:not(.forecast) > td:nth-child(2)'),
          (el) => el.innerHTML
        )
      )

      const dividends = amountDividends.map((item, index) => ({
        date: dates[index],
        amount: item,
      }))
      console.log('>>', dividends)
      await browser.close()
    })
  } catch (error) {
    console.log(error)
  }
}

start()
