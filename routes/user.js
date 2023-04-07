const router = require('express').Router()
const handler = require('../handler')


router.post('/signup', handler.user.register)
router.post('/signin', handler.user.login)

module.exports = router 