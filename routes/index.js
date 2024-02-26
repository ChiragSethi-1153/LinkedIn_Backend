const router = require("express").Router()

router.use('/', require('./user.routes'))
router.use('/', require('./post.routes'))
router.use('/', require('./comment.routes'))
router.use('/', require('./reaction.routes'))
router.use('/', require('./connections.routes'))

router.use('/', require('./404.routes'))

module.exports = router 
