const express = require('express')
const router = express.Router()
const {grantAcces} = require('../middlewares/auth')
const { getPC, addPC, updatePC, deletePC} = require('../controllers/product_categories')

router.get('/api/v1/PC/All',grantAcces('readAny', 'product_categories'), getPC)
router.post('/api/v1/PC', grantAcces('createAny', 'product_categories'), addPC)
router.put('/api/v1/PC/U:id', grantAcces('updateAny', 'product_categories'), updatePC)
router.delete('/api/v1/PC/D:id', grantAcces('deleteAny', 'product_categories'), deletePC)

module.exports = router