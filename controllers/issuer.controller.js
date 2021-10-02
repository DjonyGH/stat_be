const { Issuer } = require('../models/index')

class IssuerController {
  async createIssuer(req, res) {
    const { name, ticker, rus_name } = req.body
    const newIssuer = await Issuer({
      name,
      ticker,
      rus_name,
    })
    return res.json(newIssuer)
  }

  async getIssuer(req, res) {
    const ticker = req.params.ticker.toUpperCase()
    const issuer = await Issuer.findOne({ where: { ticker } })
    res.json(issuer)
  }

  async getAllIssuers(req, res) {
    const issuers = await Issuer.findAll()
    res.json(issuers)
  }

  // async updateIssuer(req, res) {
  //   const id = req.params.id
  //   const { name, ticker, rus_name } = req.body
  //   const issuer = await Issuer.update({ where: { ticker } })
  //   res.json(issuer.rows[0])
  // }

  // async deleteIssuer(req, res) {
  //   const ticker = req.params.ticker
  //   const issuer = await Issuer.drop({ where: { ticker } })
  //   res.json(issuer)
  // }
}

module.exports = new IssuerController()
