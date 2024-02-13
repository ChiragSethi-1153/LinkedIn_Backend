const router = require("express").Router()

router.use('/', require('./user.routes'))
router.use('/', require('./post.routes'))
router.use('/', require('./comment.routes'))
router.use('/', require('./reaction.routes'))

module.exports = router 
