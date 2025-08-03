const mongoose = require('mongoose');

const mentorshipAssignmentSchema = new mongoose.Schema({
  menteeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'active', 'completed'], default: 'pending' },
  checkInSchedule: { type: [Date], default: [] },
  lastCheckIn: { type: Date },
  feedback: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MentorshipAssignment', mentorshipAssignmentSchema);