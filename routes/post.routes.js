const {postsController} = require('../controller')

const router = require('express').Router()

router.post('/posts/:id', postsController.createPosts)
router.get('/post', postsController.getPost)
router.put('/post/:id', postsController.updatePost)
router.delete('/post:id', postsController.deletePost)


module.exports = router