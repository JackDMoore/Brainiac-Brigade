const mongoose = require('mongoose')
const { faker } = require('@faker-js/faker')
const path = require('path')

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const Event = require('../models/Event')
const User = require('../models/User')

const url = process.env.MONGODB_URI

async function seedDB() {
  try {
    const conn = await mongoose.connect(url, { useNewUrlParser: true })
    await conn.connection.db.dropDatabase()

    const username = faker.internet.userName()
    const name = faker.person.fullName()

    let newUser = new User ({
      username: username,
      name: name,
      events: []
    })
    let savedUser = await newUser.save()
    console.log('user saved')

    let getUser = await User.findOne({ "username": username })
    console.log(getUser._id)

    let newEvent = new Event ({
      description: 'Finish final presentation',
      start: faker.date.recent(),
      end: faker.date.soon(),
      user: getUser._id
    })

    let savedNewEvent = await newEvent.save()

    const filter = { username: username }
    const update = { events: newEvent }

    await User.findOneAndUpdate(filter, update)
    console.log('Database seeded!')
    conn.connection.close()

  } catch (error) {
    console.log(error.message)
  }
}

seedDB()
