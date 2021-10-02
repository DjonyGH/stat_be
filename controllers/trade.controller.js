const db = require('../db')

class TradeController {
  async createTrade(req, res) {
    try {
      const { date, issuer_id, open, close, high, low, volume } = req.body
      const newTradingDay = await db.query(
        `INSERT INTO tradings (date, issuer_id, open, close, high, low, volume) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [date, issuer_id, open, close, high, low, volume]
      )
      res.json(newTradingDay.rows[0])
    } catch (error) {
      res.json({
        status: 400,
        message: error.detail,
      })
    }
  }

  async getTradesByIssuer(req, res) {
    const id = req.params.id
    const date = req.query.date
    if (date) {
      const tradingDaysByIssuerAndDate = await db.query(
        `SELECT * FROM tradings WHERE (issuer_id = $1) AND (date = $2)`,
        [id, date]
      )
      res.json(tradingDaysByIssuerAndDate.rows[0])
    } else {
      const tradingDaysByIssuer = await db.query(`SELECT * FROM tradings WHERE issuer_id = $1`, [id])
      res.json(tradingDaysByIssuer.rows)
    }
  }
}

module.exports = new TradeController()
