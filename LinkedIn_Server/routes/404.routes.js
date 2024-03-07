const { route } = require('./user.routes')

const router = require('express').Router()

router.use('*', (req, res) => {
    return res.status(404).send("Error 404! Page Not Found")
})

module.exports = router