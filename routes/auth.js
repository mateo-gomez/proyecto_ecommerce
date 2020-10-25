
const express = require('express')
const router = express.Router()

const {

    login, 
    logout, 
    resetPassword, 
    updatePassword

} = require('../controllers/auth')
const { validationToken } = require('../middlewares/auth')


router.post('/api/v1/users/login', login)
router.post('/api/v1/users/logout', logout)
router.post('/api/v1/users/reset-password', resetPassword)
router.post('/api/v1/users/update-password', updatePassword)

module.exports = router