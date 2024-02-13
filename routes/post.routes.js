const {postsController} = require('../controller')
const { upload } = require('../middlewares/upload')

const router = require('express').Router()

router.post('/posts/:userId', upload, postsController.createPosts) //takes userId
router.get('/post', postsController.getPost)
router.put('/post/:id', postsController.updatePost)
router.delete('/post/:id', postsController.deletePosts)
router.patch('/post/:id', postsController.updatePost)

module.exports = router 