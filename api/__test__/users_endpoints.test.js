const app = require('../app')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const { faker } = require('@faker-js/faker')
const mongoose = require('mongoose')

const User = require('../models/User')

const api = supertest(app)

describe('api server', () => {

  test('user creation succeeds with a fresh username', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: faker.internet.userName(),
      name: faker.person.fullName(),
      password: faker.internet.password({ length: 6 })
    }

    const response = await api.post('/users').send(newUser)

    expect(response.status).toBe(201)

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)

  })

  test('user creation fails with username shorter than 3 charts', async() => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'te',
      name: 'test',
      password: 'test'
    }

    const response = await api.post('/users').send(newUser)
    expect(response.status).toBe(400)

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

  })

  test('user creation fails with password shorter than 3 charts', async() => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'test',
      name: 'test',
      password: 'te'
    }

    const response = await api.post('/users').send(newUser)
    expect(response.status).toBe(400)

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

  })

  test('user creation fails if username is not unique', async() => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'diegorramos',
      name: 'test',
      password: 'test'
    }
    const response1 = await api.post('/users').send(newUser)

    const response2 = await api.post('/users').send(newUser)
    expect(response2.body.error).toContain('username must be unique')

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

  })
})

afterAll(() => {
  mongoose.connection.close()
})
