const ConfidenceDashboard = require('../models/ConfidenceDashboard');

exports.createDashboard = async (req, res) => {
  try {
    const { userId, confidenceScores, milestones } = req.body;
    const dashboard = new ConfidenceDashboard({ userId, confidenceScores, milestones });
    await dashboard.save();
    res.status(201).json({ message: 'Dashboard created', dashboard });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const dashboard = await ConfidenceDashboard.findById(req.params.id).populate('userId');
    if (!dashboard) return res.status(404).json({ error: 'Dashboard not found' });
    res.json(dashboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDashboard = async (req, res) => {
  try {
    const { confidenceScores, milestones } = req.body;
    const dashboard = await ConfidenceDashboard.findByIdAndUpdate(req.params.id, { confidenceScores, milestones, lastUpdated: Date.now() }, { new: true, runValidators: true });
    if (!dashboard) return res.status(404).json({ error: 'Dashboard not found' });
    res.json({ message: 'Dashboard updated', dashboard });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteDashboard = async (req, res) => {
  try {
    const dashboard = await ConfidenceDashboard.findByIdAndDelete(req.params.id);
    if (!dashboard) return res.status(404).json({ error: 'Dashboard not found' });
    res.json({ message: 'Dashboard deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};