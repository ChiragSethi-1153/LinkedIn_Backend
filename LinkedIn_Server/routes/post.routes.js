const {postsController} = require('../controller')
const { verifyToken } = require('../middlewares/auth')
const { upload } = require('../middlewares/upload')

const router = require('express').Router()

router.post('/post',  verifyToken, upload, postsController.createPosts) //takes userId and uploads the post
router.get('/post', postsController.getPost) // find all posts for a single user
router.get('/posts',  postsController.getAllPosts) // find all posts
router.put('/post/:postId', verifyToken, postsController.updatePost) // edit post by post id
router.delete('/post/:postId', verifyToken, postsController.deletePosts) // delete post by post id
// router.patch('/post/:postId', postsController.updatePost) // patch post by post id

module.exports = router 