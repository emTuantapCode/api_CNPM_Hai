const router = require('express').Router()
const handler = require('../handler')
const { verifyToken, isAdmin } = require('../middle/token')

router.use(verifyToken)
router.get('/', handler.cartoon.read)
router.use(isAdmin)
router.post('/', handler.cartoon.add)
router.put('/', handler.cartoon.edit)
router.delete('/', handler.cartoon.destroy)

module.exports = router 
