const cron = require('node-cron')
const puppeteer = require('puppeteer')

const getDividends = () => {
  cron.schedule('* * * * *', async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.dohod.ru/ik/analytics/dividend/sberp:not(.forecast)')
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
}

module.exports = getDividends
