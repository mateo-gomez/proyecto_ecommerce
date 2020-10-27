const express = require('express')
const router = express.Router()
const {validationToken, grantAcces} = require('../middlewares/auth')
const {addCategories, getCategories, updateCategories, deleteCategories} = require('../controllers/categories')

router.post('/api/v1/categories', grantAcces('readAny', 'categories'), addCategories)
router.get('/api/v1/categories/All', grantAcces('readAny', 'categories'), getCategories)
router.put('/api/v1/categories/U', grantAcces('updateAny', 'categories'), updateCategories)
router.delete('/api/v1/categories/D', grantAcces('deleteAny', 'categories'), deleteCategories)

module.exports = router