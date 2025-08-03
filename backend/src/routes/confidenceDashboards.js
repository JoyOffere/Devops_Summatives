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
    const dashboard = await ConfidenceDashboard.findById(req.params.id).populate('userId');
    if (!dashboard) return res.status(404).json({ error: 'Confidence dashboard not found' });
    res.json(dashboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { selfRating, peerFeedback, milestones } = req.body;
    const dashboard = await ConfidenceDashboard.findByIdAndUpdate(req.params.id, { selfRating, peerFeedback, milestones }, { new: true, runValidators: true });
    if (!dashboard) return res.status(404).json({ error: 'Confidence dashboard not found' });
    res.json({ message: 'Confidence dashboard updated', dashboard });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const dashboard = await ConfidenceDashboard.findByIdAndDelete(req.params.id);
    if (!dashboard) return res.status(404).json({ error: 'Confidence dashboard not found' });
    res.json({ message: 'Confidence dashboard deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;