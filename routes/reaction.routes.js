const router = require('express').Router()
const {reactionController} = require('../controller')

router.post('/reactions/:postId', reactionController.saveReactions)
router.get('/reaction', reactionController.getReactions)
module.exports = router