const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'https://scholardorm.azurewebsites.net', // Frontend domain (correct)
    'http://localhost:3000', // for local development
    'https://localhost:3000', // for local development HTTPS
    process.env.CORS_ORIGIN
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200 // For legacy browser support
};

// Add debugging middleware BEFORE CORS
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Origin:', req.headers.origin);
  console.log('CORS_ORIGIN env:', process.env.CORS_ORIGIN);
  next();
});

app.use(cors(corsOptions));
app.use(express.json());

// Enhanced MongoDB connection for Azure
const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('MongoDB URI:', process.env.MONGO_URI ? 'URI provided' : 'URI missing');
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // Increased timeout for Azure
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      bufferMaxEntries: 0,
      retryWrites: true,
      w: 'majority'
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Retry connection after 5 seconds
    setTimeout(connectDB, 5000);
  }
};

// Import your route files
const userRoutes = require('./routes/users');
const learningProgressRoutes = require('./routes/learning-progress');
const mentorshipAssignmentRoutes = require('./routes/mentorship-assignments');
const confidenceDashboardRoutes = require('./routes/confidence-dashboards');
const portfolioProjectRoutes = require('./routes/portfolio-projects');

// Connect to database first
connectDB();

// Routes - Add both /api prefix and without prefix
app.use('/api/users', userRoutes);
app.use('/users', userRoutes);

app.use('/api/learning-progress', learningProgressRoutes);
app.use('/learning-progress', learningProgressRoutes);

app.use('/api/mentorship-assignments', mentorshipAssignmentRoutes);
app.use('/mentorship-assignments', mentorshipAssignmentRoutes);

app.use('/api/confidence-dashboards', confidenceDashboardRoutes);
app.use('/confidence-dashboards', confidenceDashboardRoutes);

app.use('/api/portfolio-projects', portfolioProjectRoutes);
app.use('/portfolio-projects', portfolioProjectRoutes);

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

// Health check endpoint for Azure
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
    healthCheck.message = error;
    res.status(503).json(healthCheck);
  }
});

// Test route to verify API is working
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working',
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Add a simple test route
app.get('/test', (req, res) => {
  res.json({ 
    message: 'Backend is working!',
    timestamp: new Date().toISOString(),
    routes: ['/users/register', '/api/users/register']
  });
});

// Add a catch-all route for debugging
app.use('*', (req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    error: 'Route not found',
    method: req.method,
    path: req.originalUrl,
    availableRoutes: [
      'GET /health',
      'GET /test',
      'POST /users/register',
      'POST /api/users/register'
    ]
  });
});

// Only start the server if this file is run directly
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;