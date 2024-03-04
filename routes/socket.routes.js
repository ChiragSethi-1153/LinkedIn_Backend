const router = require('express').Router()
const { roomController } = require('../controller')
const { verifyToken } = require('../middlewares/auth')

router.post('/room', verifyToken, roomController.createRoom)
// router.get('/reaction/:postId', verifyToken, reactionController.getPostReactions)

module.exports = router  