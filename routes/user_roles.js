const express = require('express')
const router = express.Router()

const {grantAcces} = require('../middlewares/auth')
const {addUserRoles, deletUserRoles, updateUserRoles} = require('../controllers/user_roles')

router.post('/api/v1/userRoles', grantAcces('createAny', 'user_roles'), addUserRoles)
router.delete('/api/v1/userRoles/D', grantAcces('readAny', 'user_roles'), deletUserRoles)
router.put('/api/v1/userRoles/U', grantAcces('updateAny', 'user_roles'), updateUserRoles)

module.exports = router