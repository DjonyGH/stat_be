const Router = require('express')
const router = Router()
const issuerRouter = require('./issuer.routes')
const tradeRouter = require('./trade.routes')
const dividendRouter = require('./dividend.routes')

router.use('/issuers', issuerRouter)
router.use('/trades', tradeRouter)
router.use('/dividends', dividendRouter)

module.exports = router
