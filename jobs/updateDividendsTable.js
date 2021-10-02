const cron = require('node-cron')
const puppeteer = require('puppeteer')
const { Issuer, Dividend } = require('../models/index')
const asyncForEach = require('../utils/asyncForEach')
const prepareDate = require('../utils/prepareDate')

const getDividends = async (issuerTicker) => {
  console.log(`Get Dividends for ${issuerTicker}`)
  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()
    await page.goto(`https://www.dohod.ru/ik/analytics/dividend/${issuerTicker.toLowerCase()}`)
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

    await browser.close()

    const dividends = amountDividends.map((item, index) => ({
      date: dates[index],
      amount: item,
    }))
    console.log(`Dividends for ${issuerTicker} got success`)

    return dividends
  } catch (error) {
    await browser.close()
    console.log(`No dividends for ${issuerTicker}`)
    return []
  }
}

const updateDividendsTable = () => {
  cron.schedule('21 22 * * *', async () => {
    try {
      console.log('---Start Update Dividends Table---')
      const issuers = await Issuer.findAll()
      await asyncForEach(issuers, async ({ ticker, id }) => {
        const dividends = await getDividends(ticker)
        await asyncForEach(dividends, async ({ amount, date }) => {
          console.log('Creating')
          const preparedDate = prepareDate(date)
          console.log('preparedDate', preparedDate)
          await Dividend.create({ amount, date: preparedDate, issuerId: id })
          console.log('Created')
        })
      })
      // await getDividends('AFLT')
      console.log('---End Update Dividends Table---')
    } catch (error) {
      console.log('error', error)
    }
  })
}

module.exports = updateDividendsTable
