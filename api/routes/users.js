const express = require('express')
const loginController = require('../controllers/users')
router = express.Router()

router.post('/', loginController.create)
router.get('/', loginController.index)
router.post('/login', loginController.login)

module.exports = router
