const express = require('express')
const eventsController = require('../controllers/events')
router = express.Router()


router.get('/', eventsController.index)
router.get('/:id', eventsController.show)
router.post('/', eventsController.create)
router.patch('/:id', eventsController.update)
router.delete('/:id', eventsController.destroy)

module.exports = router
