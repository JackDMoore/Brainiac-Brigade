const express = require('express')
const loginController = require('../controllers/users')
router = express.Router()

router.post('/', loginController.create)
router.get('/', loginController.index)
router.post('/login', loginController.login)
router.post('/points', loginController.updatePoints)
router.get('/points', loginController.getUserPoints)

module.exports = router
