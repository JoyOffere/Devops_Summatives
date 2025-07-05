const mongoose = require('mongoose');

const portfolioProjectSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  projectTitle: { type: String, required: true },
  description: { type: String, required: true },
  challengeId: { type: String, required: true },
  submissionDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['submitted', 'reviewed', 'approved'], default: 'submitted' },
  feedback: { type: String, default: '' }
});

module.exports = mongoose.model('PortfolioProject', portfolioProjectSchema);