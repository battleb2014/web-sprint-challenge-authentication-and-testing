const server = require('./server');
const request = require('supertest');
const db = require('../data/dbConfig');

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
})

beforeEach(async () => {
  await db('users').truncate();
})

afterAll(async () => {
  await db.destroy();
})

test('sanity', () => {
  expect(true).toBe(true)
})

describe('post /lohin', () => {
  test('responds with 401 status when username invalid', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: 'd', password: 'asdfgdfsagg' })
    expect(res.status).toBe(401)
  })

  test('responds with 400 status when password missing', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'name', password: '' })
    expect(res.status).toBe(400)
  })
})