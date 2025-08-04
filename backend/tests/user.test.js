const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../src/models/User');
const app = require('../src/index');

describe('User API', () => {
  let server;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    server = app.listen(0);
  }, 10000);

  beforeEach(async () => {
    await User.deleteMany({ email: 'test@example.com' });
  }, 10000);

  afterAll(async () => {
    await mongoose.connection.close();
    await new Promise(resolve => server.close(resolve));
  }, 10000);

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({ email: 'test@example.com', password: 'password123', name: 'Test User' });
    if (res.statusCode !== 201) {
      console.log('Response:', res.body);
    }
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully'); // Updated
  }, 10000);
});