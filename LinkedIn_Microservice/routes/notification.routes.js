const { postController } = require('../controller')
const { verifyToken } = require('../middlewares/Auth')


const router = require('express').Router()

router.get('/notifications/:userId', postController.getAllNotifications)

router.post('/notifyPost', postController.NotifyNewPost )
router.post('/notification', postController.createNotification)






module.exports = router 