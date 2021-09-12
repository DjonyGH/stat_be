const Router = require('express')
const router = Router()
const tradingController = require('../controllers/trading.controller')

router.post('/trading_day', tradingController.createTradingDay)
router.get('/trading_day/issuer/:id?', tradingController.getTradingDaysByIssuer)
// router.get('/trading_day/issuer/:id', tradingController.getTradingDayByIssuerAndDate)



module.exports = router