const express = require('express')
const router = express.Router()
const {grantAcces} = require('../middlewares/auth')
const {getPT, postPT, putPT, deletePT} = require('../controllers/product_tags')

router.get('/api/v1/PT/All', grantAcces('readAny', 'product_tags'), getPT)
router.post('/api/v1/PT', grantAcces('createAny', 'product_tags'), postPT)
router.put('/api/v1/PT/U:id', grantAcces('updateAny', 'product_tags'), putPT)
router.delete('/api/v1/PT/D:id', grantAcces('deleteAny', 'product_tags'), deletePT)


module.exports = router