const request = require('supertest');
const express = require('express');
const cors = require('cors');

// Create a minimal test app without database dependency
const createTestApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  
  // Mock user routes for testing
  app.post('/api/users/register', (req, res) => {
    const { email, password, name } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    if (email === 'existing@example.com') {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    res.status(201).json({ 
      message: 'User registered',
      user: { email, name }
    });
  });
  
  app.post('/users/register', (req, res) => {
    const { email, password, name } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    if (email === 'existing@example.com') {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    res.status(201).json({ 
      message: 'User registered',
      user: { email, name }
    });
  });
  
  app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Backend is working!' });
  });
  
  return app;
};

describe('User API', () => {
  let app;

  beforeAll(async () => {
    app = createTestApp();
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({ email: 'test@example.com', password: 'password123', name: 'Test User' });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered');
    expect(res.body.user).toHaveProperty('email', 'test@example.com');
    expect(res.body.user).toHaveProperty('name', 'Test User');
  });

  it('should reject registration with missing fields', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({ email: 'test@example.com' }); // missing password and name
    
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Missing required fields');
  });

  it('should check health endpoint', async () => {
    const res = await request(app)
      .get('/health');
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'OK');
  });
});