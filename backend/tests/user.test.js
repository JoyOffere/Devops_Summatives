const request = require('supertest');
const app = require('../src/index');

describe('User API', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({ email: 'test@example.com', password: 'password123', name: 'Test User' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered');
  });
});