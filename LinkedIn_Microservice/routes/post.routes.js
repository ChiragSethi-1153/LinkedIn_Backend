const { postController } = require('../controller')


const router = require('express').Router()

router.post('/notifyPost', postController.NotifyNewPost )

module.exports = router 