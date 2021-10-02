const Router = require('express')
const router = Router()
const tradeController = require('../controllers/trade.controller')

router.post('/', tradeController.createTrade)
router.get('/issuer/:id?', tradeController.getTradesByIssuer)
// router.get('/trading_day/issuer/:id', tradingController.getTradingDayByIssuerAndDate)

module.exports = router
