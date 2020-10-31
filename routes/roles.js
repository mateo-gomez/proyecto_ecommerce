const express = require('express')
const router = express.Router()
const {grantAcces} = require('../middlewares/auth')
const {getRoles, postRoles, putRoles, deleteRoles} = require('../controllers/roles')

router.get('/api/v1/roles/All', grantAcces('readAny', 'roles'), getRoles)
router.post('/api/v1/roles', grantAcces('createAny', 'roles'), postRoles)
router.put('/api/v1/roles/U:id', grantAcces('updateAny', 'roles'), putRoles)
router.delete('/api/v1/roles/D:id', grantAcces('deleteAny', 'roles'), deleteRoles)

module.exports = router