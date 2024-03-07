const router = require("express").Router()


router.use('/', require('./post.routes'))
// router.use('/', require('./comment.routes'))
// router.use('/', require('./reaction.routes'))
// router.use('/', require('./connections.routes'))

module.exports = router 
