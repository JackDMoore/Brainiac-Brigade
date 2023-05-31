const jwt= require('jsonwebtoken')
const Event = require('../models/Event')
const User = require('../models/User')

const index = async(req, res) => {
  const events = await Event.find({}).populate('user', { username: 1, name: 1 })
  res.json(events)
}

const show = async(req, res) => {
  const event = await Event.findById(req.params.id)
  if (event) {
    res.json(event)
  } else {
    res.status(404).end()
  }
}

const create = async(req, res) => {
  const body = req.body
  let token = ''

  // extracting token from request
  const authorization = req.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.substring(7)
  }

  // extracting user from token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missin or invalid' })
  }
  // finding user in the DB
  const user = await User.findById(decodedToken.id)


  const event = new Event({
    description: body.description,
    complete: body.complete || false,
    start: body.start,
    end: body.end,
    user: user._id
  })

  if (!event.description) {
    res.status(400).end()
  } else {
    const savedEvent = await event.save()
    user.events = user.events.concat(savedEvent._id)

    res.status(201).json(savedEvent)
  }
}

const update = async(req, res) => {
  const body = req.body

  // extracting token from request
  const authorization = req.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.substring(7)
  }

  // extracting user from token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missin or invalid' })
  }
  // finding user in the DB
  const user = await User.findById(decodedToken.id)

  // find event to update from params
  const eventToUpdate = await Event.findById(req.params.id)

  if (eventToUpdate.user.toString() === user._id.toString()) {
    const event = {
      description: body.description,
      complete: body.complete,
      start: body.start,
      end: body.end,
      user: user._id
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, event, { new: true })
    return res.json(updatedEvent)
  } else {
    return res.status(401).json({ error: 'user not the owner of the event' })
  }
}

const destroy = async(req, res) => {
  // find event to delete
  const event = await Event.findById(req.params.id)

  // extracting token from request
  const authorization = req.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.substring(7)
  }

  // extracting user from token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missin or invalid' })
  }
  // finding user in the DB
  const user = await User.findById(decodedToken.id)

  // compare event.user id with id from token
  if (event.user.toString() === user._id.toString()) {
    await Event.deleteOne(event)
    res.status(204).end()
  } else {
    return res.status(401).json({ error: 'user not the owner of the task'})
  }
}


module.exports = {
  index, show, create, update, destroy
}
