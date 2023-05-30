const Event = require('../models/Event')

const index = async(req, res) => {
  const events = await Event.find({})
  res.json(events)
}


module.exports = {
  index
}
