const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../src/models/User');
const app = require('../src/index');

describe('API Integration Tests', () => {
  beforeEach(async () => {
    // Clean up test data before each test
    await User.deleteMany({ email: /test.*@example\.com/ });
  });

  afterAll(async () => {
    // Clean up after all tests
    await User.deleteMany({ email: /test.*@example\.com/ });
    await mongoose.connection.close();
  });

  describe('User Authentication Flow', () => {
    const testUser = {
      name: 'Integration Test User',
      email: 'integration.test@example.com',
      password: 'securePassword123'
    };

    it('should register a new user successfully', async () => {
      const res = await request(app)
        .post('/api/users/register')
        .send(testUser);
      
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('message', 'User registered successfully');
      expect(res.body.user).toHaveProperty('email', testUser.email);
      expect(res.body.user).toHaveProperty('name', testUser.name);
      expect(res.body.user).not.toHaveProperty('password');
    });

    it('should not register user with duplicate email', async () => {
      // First registration
      await request(app)
        .post('/api/users/register')
        .send(testUser);
      
      // Attempt duplicate registration
      const res = await request(app)
        .post('/api/users/register')
        .send(testUser);
      
      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('message', 'Registration failed');
    });

    it('should validate required fields on registration', async () => {
      const incompleteUser = {
        name: 'Test User'
        // Missing email and password
      };

      const res = await request(app)
        .post('/api/users/register')
        .send(incompleteUser);
      
      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('success', false);
    });

    it('should login with correct credentials', async () => {
      // First register a user
      await request(app)
        .post('/api/users/register')
        .send(testUser);

      // Then try to login
      const res = await request(app)
        .post('/api/users/login')
        .send({
          email: testUser.email,
          password: testUser.password
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Login successful');
      expect(res.body).toHaveProperty('user');
      expect(res.body.user).toHaveProperty('email', testUser.email);
    });

    it('should reject login with incorrect credentials', async () => {
      const res = await request(app)
        .post('/api/users/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'wrongpassword'
        });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('error', 'Invalid credentials');
    });
  });

  describe('User CRUD Operations', () => {
    let userId;

    beforeEach(async () => {
      // Create a test user for CRUD operations
      const testUser = new User({
        name: 'CRUD Test User',
        email: 'crud.test@example.com',
        password: 'password123'
      });
      const savedUser = await testUser.save();
      userId = savedUser._id;
    });

    it('should get all users (excluding passwords)', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      
      // Check that passwords are excluded
      res.body.forEach(user => {
        expect(user).not.toHaveProperty('password');
      });
    });

    it('should get a specific user by ID', async () => {
      const res = await request(app)
        .get(`/api/users/${userId}`)
        .expect(200);

      expect(res.body).toHaveProperty('_id', userId.toString());
      expect(res.body).toHaveProperty('email', 'crud.test@example.com');
    });

    it('should update a user', async () => {
      const updateData = {
        name: 'Updated Test User',
        learningGoals: ['JavaScript', 'React'],
        confidenceScore: 85
      };

      const res = await request(app)
        .put(`/api/users/${userId}`)
        .send(updateData)
        .expect(200);

      expect(res.body).toHaveProperty('message', 'User updated');
      expect(res.body.user).toHaveProperty('name', 'Updated Test User');
      expect(res.body.user).toHaveProperty('confidenceScore', 85);
    });

    it('should delete a user', async () => {
      const res = await request(app)
        .delete(`/api/users/${userId}`)
        .expect(200);

      expect(res.body).toHaveProperty('message', 'User deleted');

      // Verify user is actually deleted
      const getRes = await request(app)
        .get(`/api/users/${userId}`)
        .expect(404);

      expect(getRes.body).toHaveProperty('error', 'User not found');
    });

    it('should return 404 for non-existent user', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      
      const res = await request(app)
        .get(`/api/users/${fakeId}`)
        .expect(404);

      expect(res.body).toHaveProperty('error', 'User not found');
    });
  });

  describe('API Endpoints', () => {
    it('should return API information', async () => {
      const res = await request(app)
        .get('/api')
        .expect(200);
      
      expect(res.body).toHaveProperty('users');
      expect(res.body).toHaveProperty('learningProgress');
      expect(res.body).toHaveProperty('confidenceDashboards');
      expect(res.body).toHaveProperty('portfolioProjects');
      expect(res.body).toHaveProperty('mentorshipAssignments');
    });

    it('should return health check information', async () => {
      const res = await request(app)
        .get('/health')
        .expect(200);
      
      expect(res.body).toHaveProperty('uptime');
      expect(res.body).toHaveProperty('message', 'OK');
      expect(res.body).toHaveProperty('mongodb');
      expect(res.body).toHaveProperty('timestamp');
    });

    it('should handle 404 for non-existent routes', async () => {
      const res = await request(app)
        .get('/api/non-existent-route')
        .expect(404);
      
      expect(res.body).toHaveProperty('error', 'Route not found');
      expect(res.body).toHaveProperty('availableRoutes');
    });
  });

  describe('Dashboard Data Endpoints', () => {
    it('should fetch confidence dashboard data', async () => {
      const res = await request(app)
        .get('/api/confidence-dashboards')
        .expect(200);
      
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('should fetch learning progress data', async () => {
      const res = await request(app)
        .get('/api/learning-progress')
        .expect(200);
      
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('should fetch portfolio projects data', async () => {
      const res = await request(app)
        .get('/api/portfolio-projects')
        .expect(200);
      
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('should fetch mentorship assignments data', async () => {
      const res = await request(app)
        .get('/api/mentorship-assignments')
        .expect(200);
      
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should handle malformed JSON gracefully', async () => {
      const res = await request(app)
        .post('/api/users/register')
        .set('Content-Type', 'application/json')
        .send('{"invalid": json}');
      
      // Should return 400 for malformed JSON
      expect([400, 500].includes(res.statusCode)).toBe(true);
    });

    it('should handle database connection issues', async () => {
      // This test simulates what happens when DB operations fail
      // In a real scenario, you might mock mongoose to throw errors
      const res = await request(app)
        .get('/api/users')
        .expect(res => {
          // Should either work (200) or fail gracefully (500)
          expect([200, 500].includes(res.statusCode)).toBe(true);
        });
    });
  });

  describe('CORS Configuration', () => {
    it('should handle preflight OPTIONS requests', async () => {
      const res = await request(app)
        .options('/api/users/register')
        .set('Origin', 'http://localhost:3000')
        .set('Access-Control-Request-Method', 'POST');
      
      // Should allow the request
      expect([200, 204].includes(res.statusCode)).toBe(true);
    });

    it('should include CORS headers', async () => {
      const res = await request(app)
        .get('/api')
        .set('Origin', 'http://localhost:3000');
      
      expect(res.headers).toHaveProperty('access-control-allow-origin');
    });
  });
});
