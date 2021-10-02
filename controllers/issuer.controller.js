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
    const id = req.params.id
    const issuer = await db.query(`SELECT * FROM issuers WHERE id = $1`, [id])
    res.json(issuer.rows[0])
  }

  async getAllIssuers(req, res) {
    const issuers = await db.query(`SELECT * FROM issuers`)
    res.json(issuers.rows)
  }

  async updateIssuer(req, res) {
    const id = req.params.id
    const { name, ticker, rus_name } = req.body
    const issuer = await db.query(
      `UPDATE issuers SET name = $1, ticker = $2, rus_name = $3 WHERE id = $4 RETURNING *`,
      [name, ticker, rus_name, id]
    )
    res.json(issuer.rows[0])
  }

  async deleteIssuer(req, res) {
    const id = req.params.id
    const issuer = await db.query(`DELETE FROM issuers WHERE id = $1`, [id])
    res.json(issuer.rows[0])
  }
}

module.exports = new IssuerController()
