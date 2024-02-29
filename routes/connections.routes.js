
const {connectionsController} = require('../controller')
const { verifyToken } = require('../middlewares/auth')
const router = require('express').Router()

router.post('/connection', verifyToken, connectionsController.newConnection) // userId of person to whom connection request is being send
router.get('/connectionto', verifyToken, connectionsController.getConnectionTo)
router.get('/connectionby', verifyToken, connectionsController.getConnectionBy)
router.get('/connections', verifyToken, connectionsController.getAllConnections)

router.put('/connection', verifyToken, connectionsController.editConnectionStatus)
router.get('/suggestions', verifyToken, connectionsController.getSuggestions)
// router.delete()
 
module.exports = router   