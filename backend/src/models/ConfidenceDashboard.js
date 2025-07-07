const mongoose = require('mongoose');

const confidenceDashboardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  confidenceScores: { type: Map, of: Number, default: {} }, // Map of dates to scores
  milestones: { type: [String], default: [] }, // List of achieved milestones
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ConfidenceDashboard', confidenceDashboardSchema);