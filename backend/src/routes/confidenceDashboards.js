const express = require('express');
const router = express.Router();
const ConfidenceDashboard = require('../models/ConfidenceDashboard');

// Get all confidence dashboards
router.get('/', async (req, res) => {
  try {
    const dashboards = await ConfidenceDashboard.find().populate('userId');
    res.json(dashboards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { userId, selfRating, peerFeedback, milestones } = req.body;
    const dashboard = new ConfidenceDashboard({ userId, selfRating, peerFeedback, milestones });
    await dashboard.save();
    res.status(201).json({ message: 'Confidence dashboard created', dashboard });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const assignment = await MentorshipAssignment.findById(req.params.id).populate('menteeId mentorId');
    if (!assignment) return res.status(404).json({ error: 'Assignment not found' });
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { status, checkInSchedule, lastCheckIn, feedback } = req.body;
    const assignment = await MentorshipAssignment.findByIdAndUpdate(req.params.id, { status, checkInSchedule, lastCheckIn, feedback }, { new: true, runValidators: true });
    if (!assignment) return res.status(404).json({ error: 'Assignment not found' });
    res.json({ message: 'Assignment updated', assignment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const assignment = await MentorshipAssignment.findByIdAndDelete(req.params.id);
    if (!assignment) return res.status(404).json({ error: 'Assignment not found' });
    res.json({ message: 'Assignment deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;