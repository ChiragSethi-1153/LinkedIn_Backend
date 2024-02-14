const router = require('express').Router()
const {reactionController} = require('../controller')
const { verifyToken } = require('../middlewares/auth')

router.post('/reactions/:postId',verifyToken, reactionController.savePostReactions)
router.get('/reaction/:postId',verifyToken, reactionController.getPostReactions)

router.post('/reactions/:commentId', verifyToken, reactionController.saveCommentReactions)
router.get('/reaction/:commentId',verifyToken,  reactionController.getCommentReactions)

router.put('/reaction/:reactionId', verifyToken, reactionController.updateReaction )
router.delete('/reaction/:reactionId', verifyToken, reactionController.removeReaction)

module.exports = router