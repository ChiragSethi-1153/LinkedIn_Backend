const router = require('express').Router()
const { roomController, messageController } = require('../controller')
const { verifyToken } = require('../middlewares/auth')

router.post('/room', verifyToken, roomController.createRoom)
router.get('/rooms', verifyToken, roomController.fetchRooms)

router.post('/message', verifyToken, messageController.createMessage)
router.get('/messages', verifyToken, messageController.fetchMessages)
module.exports = router  