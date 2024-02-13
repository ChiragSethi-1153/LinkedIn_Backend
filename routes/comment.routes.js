const {commentController} = require('../controller')
const router = require('express').Router()

router.post('/comment/:postId', commentController.postComment) //takes postId
router.get('/comments', commentController.getAllComments)
router.put('/comment/:commentId', commentController.editComment)
router.delete('/comment/:commentId', commentController.deleteComment)
// router.patch('/comment/:id', commentController.editComment)

module.exports = router 