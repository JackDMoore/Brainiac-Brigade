const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')


const index = async (req, res) => {
  const users = await User.find({}).populate('events')

  res.json(users)
}

const create = async (req, res) => {
  const { username, name, password } = req.body

  // validate username and password > 3 chars long

  if (username.length < 3 || password.length < 3) {
    return res.status(400).json({
      error: 'username & password need to be at least 3 chars long'
    })
  }

  // validate if username is unique
  const notUniqueUser = await User.findOne({ username })
  if(notUniqueUser) {
    return res.status(400).json({
      error: 'username must be unique'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
}

const login = async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  res
    .status(200)
    .send({ token, username: user.username, name: user.name})

}

const updatePoints = async (req, res) => {
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

  const points = body.points

  const updatedUser = await User.findByIdAndUpdate(user.id, { points: points }, { new: true })
  return res.json(updatedUser)
}

const getUserPoints = async(req,res) => {
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
  const points = user.points
  return res.json(points)
}

module.exports = {
  index, create, login, updatePoints, getUserPoints
}
