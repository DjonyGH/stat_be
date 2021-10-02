const Router = require('express')
const router = Router()
const issuerController = require('../controllers/issuer.controller')

router.post('/', issuerController.createIssuer)
router.get('/', issuerController.getAllIssuers)
router.get('/:ticker', issuerController.getIssuer)
// router.put('/:id', issuerController.updateIssuer)
// router.delete('/:id', issuerController.deleteIssuer)

module.exports = router
