const express = require('express');
const router = express.Router();
const LearningProgress = require('../models/LearningProgress');

// Get all learning progress records
router.get('/', async (req, res) => {
  try {
    const allProgress = await LearningProgress.find().populate('userId');
    res.json(allProgress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { userId, courseId, lessonsCompleted, quizScores, offlineResourcesDownloaded } = req.body;
    const progress = new LearningProgress({ userId, courseId, lessonsCompleted, quizScores, offlineResourcesDownloaded });
    await progress.save();
    res.status(201).json({ message: 'Learning progress created', progress });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const progress = await LearningProgress.findById(req.params.id).populate('userId');
    if (!progress) return res.status(404).json({ error: 'Progress not found' });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { lessonsCompleted, quizScores, offlineResourcesDownloaded } = req.body;
    const progress = await LearningProgress.findByIdAndUpdate(req.params.id, { lessonsCompleted, quizScores, offlineResourcesDownloaded, lastUpdated: Date.now() }, { new: true, runValidators: true });
    if (!progress) return res.status(404).json({ error: 'Progress not found' });
    res.json({ message: 'Progress updated', progress });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const progress = await LearningProgress.findByIdAndDelete(req.params.id);
    if (!progress) return res.status(404).json({ error: 'Progress not found' });
    res.json({ message: 'Progress deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;