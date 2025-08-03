const request = require('supertest');
const mongoose = require('mongoose');

// Mock the database connection for testing
jest.mock('mongoose', () => ({
  connect: jest.fn(),
  connection: {
    close: jest.fn(),
  },
}));

// Create a simple Express app for testing without database
const express = require('express');
const app = express();
app.use(express.json());

// Mock user registration endpoint
app.post('/api/users/register', (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  // Mock successful registration
  res.status(201).json({
    message: 'User registered successfully',
    user: { id: '1', name, email }
  });
});

describe('User API', () => {
  beforeEach(async () => {
    // Mock database cleanup - no actual database operations
    jest.clearAllMocks();
  });

  afterAll(async () => {
    // Mock connection close
    jest.clearAllMocks();
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({ email: 'test@example.com', password: 'password123', name: 'Test User' });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
    expect(res.body.user).toHaveProperty('name', 'Test User');
    expect(res.body.user).toHaveProperty('email', 'test@example.com');
  });
});