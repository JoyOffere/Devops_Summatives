const mongoose = require('mongoose');

const learningProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: String, required: true },
  lessonsCompleted: { type: [String], default: [] },
  quizScores: { type: Map, of: Number, default: {} }, // Map of quiz IDs to scores
  offlineResourcesDownloaded: { type: [String], default: [] },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LearningProgress', learningProgressSchema);