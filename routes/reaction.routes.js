const router = require('express').Router()
const {reactionController} = require('../controller')

router.post('/reactions/:postId', reactionController.savePostReactions)
router.get('/reaction/:postId', reactionController.getPostReactions)

router.post('/reactions/:commentId', reactionController.saveCommentReactions)
router.get('/reaction/:commentId', reactionController.getCommentReactions)

router.put('/reaction/:reactionId', reactionController.updateReaction )
router.delete('/reaction/:reactionId', reactionController.removeReaction)

module.exports = router