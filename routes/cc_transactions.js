const express = require('express')
const router = express.Router()
const {grantAcces} = require('../middlewares/auth')
const {getCCT, postCCT, putCCT, deleteCCT} = require('../controllers/cc_transactions')

router.get('/api/v1/CCT/All', grantAcces('readAny', 'cc_transactions'), getCCT)
router.post('/api/v1/CCT', grantAcces('createAny', 'cc_transactions'), postCCT)
router.put('/api/v1/CCT/U:id', grantAcces('updateAny', 'cc_transactions'), putCCT)
router.delete('/api/v1/CCT/D:id', grantAcces('deleteAny', 'cc_transactions'), deleteCCT)

module.exports = router