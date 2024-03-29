const {userController} = require('../controller/index')
const { verifyToken } = require('../middlewares/auth')
const router = require('express').Router()

router.post("/signup", userController.signup)
router.post("/login", userController.login)
router.get("/user",  verifyToken, userController.getUser)

router.put("/user", verifyToken, userController.editUser)

router.get('/users', verifyToken, userController.getAllUsers)

module.exports = router 