const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../src/models/User');
const app = require('../src/index');

describe('User API', () => {
  let server;

  beforeAll(async () => {
    // Start the server before tests
    server = app.listen(0); // Use 0 to pick a random available port
  });

  beforeEach(async () => {
    await User.deleteMany({ email: 'test@example.com' });
  });

  afterAll(async () => {
    // Close the server and MongoDB connection after tests
    await new Promise((resolve) => server.close(resolve));
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