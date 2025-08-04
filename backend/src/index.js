const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();

// Validate environment variables
if (!process.env.MONGO_URI) {
  console.error('Error: MONGO_URI is not defined in environment variables');
  process.exit(1);
}

// CORS configuration
const corsOptions = {
  origin: [
    'https://scholardorm.azurewebsites.net',
    'http://localhost:3000',
    'https://localhost:3000',
    ...(process.env.CORS_ORIGIN ? [process.env.CORS_ORIGIN] : [])
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
};

// Debugging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Origin:', req.headers.origin);
  console.log('CORS_ORIGIN env:', process.env.CORS_ORIGIN);
  next();
});

app.use(cors(corsOptions));
app.use(express.json());

// MongoDB connection
const connectDB = async (retries = 5) => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('MongoDB URI:', process.env.MONGO_URI ? 'URI provided' : 'URI missing');
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      retryWrites: true,
      writeConcern: {
        w: 'majority'
      }
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB connection error (attempt ${6 - retries}):`, error);
    if (retries > 1) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      return connectDB(retries - 1);
    } else {
      console.error('Max retries reached. Exiting...');
      process.exit(1);
    }
  }
};

// Import routes
const userRoutes = require('./routes/users');
const learningProgressRoutes = require('./routes/learningProgress');
const mentorshipAssignmentRoutes = require('./routes/mentorshipAssignments');
const confidenceDashboardRoutes = require('./routes/confidenceDashboards');
const portfolioProjectRoutes = require('./routes/portfolioProjects');

// Connect to database
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/learning-progress', learningProgressRoutes);
app.use('/api/mentorship-assignments', mentorshipAssignmentRoutes);
app.use('/api/confidence-dashboards', confidenceDashboardRoutes);
app.use('/api/portfolio-projects', portfolioProjectRoutes);

app.get('/api', (req, res) => {
  res.json({
    users: '/api/users',
    learningProgress: '/api/learning-progress',
    mentorshipAssignments: '/api/mentorship-assignments',
    confidenceDashboards: '/api/confidence-dashboards',
    portfolioProjects: '/api/portfolio-projects'
  });
});

app.get('/', (req, res) => res.send('Scholar-Dorm API'));

// Health check endpoint
app.get('/health', (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  };
  
  try {
    res.status(200).json(healthCheck);
  } catch (error) {
    healthCheck.message = error.message;
    res.status(503).json(healthCheck);
  }
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working',
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.get('/test', (req, res) => {
  res.json({ 
    message: 'Backend is working!',
    timestamp: new Date().toISOString(),
    routes: ['/api/users/register', '/api/test']
  });
});

// Catch-all route
app.use((req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    error: 'Route not found',
    method: req.method,
    path: req.originalUrl,
    availableRoutes: [
      'GET /health',
      'GET /test',
      'POST /api/users/register'
    ]
  });
});

// Start server if run directly
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;