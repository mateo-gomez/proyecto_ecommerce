const express = require('express')
const router = express.Router()

const {grantAcces} = require('../middlewares/auth')
const {getTags, postTags, putTags, deleteTags} = require('../controllers/tags')

router.get('/api/v1/tags/All', grantAcces('readAny', 'tags'), getTags)
router.post('/api/v1/tags', grantAcces('createAny', 'tags'), postTags)
router.put('/api/v1/tags/U:id', grantAcces('updateAny', 'tags'), putTags)
router.delete('/api/v1/tags/D:id', grantAcces('deleteAny', 'tags'), deleteTags)

module.exports = router