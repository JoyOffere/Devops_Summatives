const express = require('express');
const router = express.Router();
const ConfidenceDashboard = require('../models/ConfidenceDashboard');

// Get all confidence dashboards
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    let query = {};
    if (userId) query.userId = userId;
    
    const dashboards = await ConfidenceDashboard.find(query).populate('userId');
    res.json(dashboards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { userId, skillArea, currentConfidence, targetConfidence, lastAssessment } = req.body;
    const dashboard = new ConfidenceDashboard({ userId, skillArea, currentConfidence, targetConfidence, lastAssessment });
    await dashboard.save();
    res.status(201).json({ message: 'Confidence dashboard created', dashboard });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const dashboard = await ConfidenceDashboard.findById(req.params.id).populate('userId');
    if (!dashboard) return res.status(404).json({ error: 'Dashboard not found' });
    res.json(dashboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { skillArea, currentConfidence, targetConfidence, lastAssessment } = req.body;
    const dashboard = await ConfidenceDashboard.findByIdAndUpdate(req.params.id, { skillArea, currentConfidence, targetConfidence, lastAssessment }, { new: true, runValidators: true });
    if (!dashboard) return res.status(404).json({ error: 'Dashboard not found' });
    res.json({ message: 'Dashboard updated', dashboard });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const dashboard = await ConfidenceDashboard.findByIdAndDelete(req.params.id);
    if (!dashboard) return res.status(404).json({ error: 'Dashboard not found' });
    res.json({ message: 'Dashboard deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;