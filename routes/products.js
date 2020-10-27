const express = require('express')
const router = express.Router()
const {grantAcces} = require('../middlewares/auth')
const {getProducts, addProducts, updateProducts, deleteProducts} = require('../controllers/products')

router.get('/api/v1/products/All', grantAcces('readAny', 'products'), getProducts)
router.post('/api/v1/products', grantAcces('createAny', 'products'), addProducts)
router.put('/api/v1/products/U', grantAcces('updateAny', 'products'), updateProducts)
router.delete('/api/v1/products/D', grantAcces('deleteAny', 'products'), deleteProducts)


module.exports= router

