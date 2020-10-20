
const express = require('express')
const router = express.Router()

const {} = require('../controllers/users')

router.post('/api/v1/users')
router.get('/api/v1/users')
router.get('/api/v1/users/:id')
router.put('/api/v1/users/:id')
router.delete('/api/v1/users/:id')

module.exports = router