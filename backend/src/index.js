const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Configure CORS to allow frontend URL (both stable and revision-specific)
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://scholardorm-frontend-staging.gentlemeadow-49027184.eastus.azurecontainerapps.io',
      'http://localhost:3000'
    ];
    
    // Regex for revision-specific URLs
    const revisionPattern = /^https:\/\/scholardorm-frontend-staging--.*\.gentlemeadow-49027184\.eastus\.azurecontainerapps\.io$/;
    
    console.log('CORS Origin Check:', origin);
    
    if (!origin || allowedOrigins.includes(origin) || revisionPattern.test(origin)) {
      console.log('CORS Origin Allowed:', origin);
      callback(null, true);
    } else {
      console.log('CORS Origin Blocked:', origin);
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));
app.use(express.json());

// MongoDB Connection (optional for testing)
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
} else {
  console.log('MongoDB URI not provided - running without database');
}

// Routes
const userRoutes = require('./routes/users');
const learningProgressRoutes = require('./routes/learningProgress');
const mentorshipAssignmentRoutes = require('./routes/mentorshipAssignments');
const confidenceDashboardRoutes = require('./routes/confidenceDashboards');
const portfolioProjectRoutes = require('./routes/portfolioProjects');

app.use('/api/users', userRoutes);
app.use('/api/learning-progress', learningProgressRoutes);
app.use('/api/mentorship-assignments', mentorshipAssignmentRoutes);
app.use('/api/confidence-dashboards', confidenceDashboardRoutes);
app.use('/api/portfolio-projects', portfolioProjectRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'scholardorm-api'
  });
});

app.get('/', (req, res) => res.send('Scholar-Dorm API'));

// Only start the server if this file is run directly
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;