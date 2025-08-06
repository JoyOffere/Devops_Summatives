const request = require('supertest');
const app = require('../src/index');
const User = require('../src/models/User');

// Mock the User model
jest.mock('../src/models/User');

describe('User API', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    
    // Setup default mock implementations
    User.deleteMany = jest.fn().mockResolvedValue({ deletedCount: 0 });
    User.findOne = jest.fn();
    User.prototype.save = jest.fn();
  });

  it('should register a new user', async () => {
    // Mock User.findOne to return null (user doesn't exist)
    User.findOne.mockResolvedValue(null);
    
    // Mock save method to return user data
    const mockUser = { 
      _id: 'mock-id', 
      email: 'test@example.com', 
      name: 'Test User',
      password: 'hashedpassword'
    };
    User.prototype.save.mockResolvedValue(mockUser);

    const res = await request(app)
      .post('/api/users/register')
      .send({ email: 'test@example.com', password: 'password123', name: 'Test User' });
      
    if (res.statusCode !== 201) {
      console.log('Response:', res.body);
    }
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });
});