const express = require('express')
const eventsController = require('../controllers/events')
router = express.Router()


router.get('/', eventsController.index)

module.exports = router
