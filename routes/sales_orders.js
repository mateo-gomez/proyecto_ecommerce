const express = require('express')
const router = express.Router()

const {grantAcces} = require('../middlewares/auth')
const {getSO, postSO, putSO, deleteSO} = require('../controllers/sales_orders')

router.get('/api/v1/salesOrders/All', grantAcces('readAny', 'sales_orders'), getSO)
router.post('/api/v1/salesOrders', grantAcces('createAny', 'sales_orders'), postSO)
router.put('/api/v1/salesOrders/U:id', grantAcces('updateAny', 'sales_orders'), putSO)
router.delete('/api/v1/salesOrders/D:id', grantAcces('deleteAny', 'sales_orders'), deleteSO)

module.exports = router