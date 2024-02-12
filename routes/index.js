const router = require("express").Router()
router.use('/', require('./user.routes'))
router.use('/', require('./post.routes'))

module.exports = router 
