const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

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

app.get('/', (req, res) => res.send('Scholar-Dorm API'));

// Only start the server if this file is run directly
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;