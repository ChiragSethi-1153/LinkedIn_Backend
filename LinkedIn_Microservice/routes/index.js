const router = require("express").Router()


router.use('/', require('./notification.routes'))

module.exports = router 
