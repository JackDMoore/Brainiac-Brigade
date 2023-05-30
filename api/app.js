const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()

const eventsRouter = require('./routes/events')
const usersRouter = require('./routes/users')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// connecting to mongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('connected to MongoDB')

  } catch (error) {
    console.log('error connecting to MongoDB', error.message)
  }

}

connectDB()

app.get('/', (req, res) => {
  res.json({
    name: 'Brainiac Brigade',
    description: 'Organize your tasks'
  })
})

app.use('/events', eventsRouter)
app.use('/users', usersRouter)



module.exports = app
