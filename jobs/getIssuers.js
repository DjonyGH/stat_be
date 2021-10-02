const { default: axios } = require('axios')
const cron = require('node-cron')
const { Issuer } = require('../models/index')

const getIssuers = () => {
  cron.schedule('04 15 * * *', async () => {
    console.log('---Start---')
    try {
      let allIssuers = []
      let start = 0

      do {
        const response = await axios.get(
          `http://iss.moex.com/iss/history/engines/stock/markets/shares/boards/tqbr/securities.json?date=2021-09-17&start=${start}`
        )

        const issuers = response.data.history.data

        allIssuers = allIssuers.concat(issuers)

        if (!!issuers.length) {
          start = allIssuers.length - 1
        } else {
          start = 0
        }
      } while (allIssuers.length && start !== 0)

      allIssuers.forEach(async (issuer) => {
        await Issuer.create({ name: '', ticker: issuer[3], rus_name: issuer[2] })
      })
      console.log('---End---', allIssuers)
    } catch (error) {
      console.log('error: ', error)
    }
  })
}

module.exports = getIssuers
