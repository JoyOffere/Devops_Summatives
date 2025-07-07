const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../src/models/User');
const app = require('../src/index');

describe('User API', () => {
  beforeEach(async () => {
    await User.deleteMany({ email: 'test@example.com' });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({ email: 'test@example.com', password: 'password123', name: 'Test User' });
    if (res.statusCode !== 201) {
      console.log('Response:', res.body);
    }
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered');
  });
});