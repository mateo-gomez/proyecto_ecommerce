const express = require('express')
const router = express.Router()

const {grantAcces} = require('../middlewares/auth')
const {getOP, postOP, putOP, deleteOP} = require('../controllers/order_products')
const order_products = require('../controllers/order_products')

router.get('/api/v1/OP/All', grantAcces('readAny', 'order_products'), getOP)
router.post('/api/v1/OP', grantAcces('createAny', 'order_products'), postOP)
router.put('/api/v1/OP/U:id', grantAcces('updateAny', 'order_products'), putOP)
router.delete('/api/v1/OP/D:id', grantAcces('deleteAny', 'order_products'),deleteOP)

module.exports = router