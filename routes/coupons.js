const express = require('express')
const router = express.Router()
const {grantAcces} = require('../middlewares/auth')
const {getCoupones, postCoupones, putCoupones, deleteCoupones} = require('../controllers/coupons')


router.get('/api/v1/coupons/All', grantAcces('readAny', 'coupones'), getCoupones)
router.post('/api/v1/coupons', grantAcces('createAny', 'coupones'), postCoupones)
router.put('/api/v1/coupons/U:id', grantAcces('updateAny', 'coupones'), putCoupones)
router.delete('/api/v1/coupons/D:id', grantAcces('deleteAny', 'coupones'), deleteCoupones)


module.exports = router