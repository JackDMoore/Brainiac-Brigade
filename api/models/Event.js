const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  text: { type: String, required: true},
  done: {type: Boolean, default: false},
  start : {
    type: Date,
    // required: [true, 'Please insert the start of your event']
  },
  end: {
    type: Date,
    // required: [true, 'Please insert the end of your event']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event
