const express = require('express')
const router = express.Router()
const {grantAcces} = require('../middlewares/auth')
const {addPS, updatePS, deletePS, getPS} = require('../controllers/product_statuses')

router.get('/api/v1/PS/All', grantAcces('readAny', 'product_statuses'), getPS)
router.post('/api/v1/PS', grantAcces('createAny', 'product_statuses'), addPS)
router.put('/api/v1/PS/U', grantAcces('updateAny', 'product_statuses'), updatePS)
router.delete('/api/v1/PS/D', grantAcces('deleteAny', 'product_statuses'), deletePS)

module.exports = router