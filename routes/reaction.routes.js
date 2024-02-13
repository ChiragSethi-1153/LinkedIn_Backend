const router = require('express').Router()
const {reactionController} = require('../controller')

router.post('/reactions/:postId', reactionController.saveReactions)
router.get('/reaction', reactionController.getReactions)
router.put('/reaction/:reactionId', reactionController.updateReaction )
router.delete('/reaction/:reactionId', reactionController.removeReaction)

module.exports = router