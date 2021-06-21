const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

describe('when there is initially users saved', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('all users are returned', async () => {
    const response = await api.get('/api/users')

    expect(response.body).toHaveLength(helper.initialUsers.length)
  })
})

describe('creating a new user', () => {
  test('return proper response when password is missing', async () => {
    const newUser = {
      username: 'ahaha',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })
  test('return proper response when username is missing', async () => {
    const newUser = {
      passwordHash: 'hushdanfosafn'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })
  test('return statuscode 400 when a validation error occurs', async () => {
    const newUser = {
      username: 'ja',
      name: 'jajaja',
      passwordHash: 'lmgfg'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})