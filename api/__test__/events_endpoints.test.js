const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')

const Event = require('../models/Event')

const api = supertest(app)

describe('api server', () => {

  test('responds to get / with status 200', async () => {
    const testData = {
      name: 'Brainiac Brigade',
      text: 'Organize your tasks'
    }

    const response = await api.get('/')
    expect(response.status).toBe(200)
    expect(response.body).toEqual(testData)

  })

  test('responds to get /events with status 200', async () => {

    const response = await api.get('/events')
    expect(response.status).toBe(200)

  })


})


afterAll(() => {
  mongoose.connection.close()
})
