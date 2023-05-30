const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    }
  ]
})

const User = mongoose.model('User', userSchema)

module.exports = User
