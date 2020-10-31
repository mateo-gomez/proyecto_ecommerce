
const express = require('express')
const router = express.Router()
const {validationToken, grantAcces} = require('../middlewares/auth')

const {

    register, 
    findAll, 
    findOne, 
    deactivate, 
    update
    
} = require('../controllers/users')

router.post('/api/v1/users', register)
router.get('/api/v1/users', validationToken, grantAcces('readAny', 'users'), findAll)
router.get('/api/v1/users/:id', validationToken, grantAcces('readAny', 'users'), findOne)
router.put('/api/v1/users/:id', validationToken, grantAcces('updateAny', 'users'), update)
router.delete('/api/v1/users/:id', validationToken, grantAcces('deleteAny', 'users'), deactivate)

module.exports = router