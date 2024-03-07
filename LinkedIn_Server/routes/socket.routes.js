const router = require('express').Router()
const { roomController, messageController } = require('../controller')
const { verifyToken } = require('../middlewares/auth')

router.post('/room', verifyToken, roomController.createRoom)
router.get('/rooms', verifyToken, roomController.fetchRooms)

// router.post('/message', messageController.createMessage)
router.get('/messages/:roomId',  messageController.fetchMessages)
module.exports = router  