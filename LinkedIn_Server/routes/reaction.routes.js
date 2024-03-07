const router = require('express').Router()
const {reactionController} = require('../controller')
const { verifyToken } = require('../middlewares/auth')

router.post('/reactions/:postId',verifyToken, reactionController.savePostReactions)
router.get('/reaction/:postId', verifyToken, reactionController.getPostReactions)

router.post('/reactions/:commentId', verifyToken, reactionController.saveCommentReactions)
router.get('/reaction/:commentId',  reactionController.getCommentReactions)

// router.put('/reaction/:reactionId', verifyToken, reactionController.updateReaction )
router.delete('/reaction/:postId', verifyToken, reactionController.removeReaction)
router.delete('/reactions/:commentId', reactionController.deleteReactions)

module.exports = router  