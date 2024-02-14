const {postsController} = require('../controller')
const { upload } = require('../middlewares/upload')

const router = require('express').Router()

router.post('/posts/:userId', upload, postsController.createPosts) //takes userId and uploads the post
router.get('/post/:userId', postsController.getPost) // find all posts for a dingle user
router.get('/posts', postsController.getAllPosts) // find all posts
router.put('/post/:postId', postsController.updatePost) // edit post by post id
router.delete('/post/:postId', postsController.deletePosts) // delete post by post id
router.patch('/post/:postId', postsController.updatePost) // patch post by post id

module.exports = router 