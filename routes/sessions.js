const express = require('express')
const router = express.Router()
const {grantAcces} = require('../middlewares/auth')
const {getSessions, postSessions, putSessions, deleteSessions} = require('../controllers/sessions')

router.get('/api/v1/sessions/All', grantAcces('readAny', 'sessions'), getSessions)
router.post('/api/v1/sessions', grantAcces('createAny', 'sessions'), postSessions)
router.put('/api/v1/sessions/U:id', grantAcces('updateAny', 'sessions'), putSessions)
router.delete('/api/v1/sessions/D:id', grantAcces('deleteAny', 'sessions'), deleteSessions)

module.exports = router