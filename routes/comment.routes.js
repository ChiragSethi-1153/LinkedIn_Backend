const {commentController} = require('../controller')
const { verifyToken } = require('../middlewares/auth')
const router = require('express').Router()

router.post('/comment/:postId', verifyToken, commentController.postComment) //takes postId
router.get('/comments', commentController.getAllComments)
router.put('/comment/:commentId', verifyToken, commentController.editComment)
router.delete('/comment/:commentId', verifyToken, commentController.deleteComment)
// router.patch('/comment/:id', commentController.editComment)

module.exports = router 