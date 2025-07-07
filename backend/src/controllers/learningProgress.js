const LearningProgress = require('../models/LearningProgress');

exports.createProgress = async (req, res) => {
  try {
    const { userId, courseId, lessonsCompleted, quizScores, offlineResourcesDownloaded } = req.body;
    const progress = new LearningProgress({ userId, courseId, lessonsCompleted, quizScores, offlineResourcesDownloaded });
    await progress.save();
    res.status(201).json({ message: 'Learning progress created', progress });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProgress = async (req, res) => {
  try {
    const progress = await LearningProgress.findById(req.params.id).populate('userId');
    if (!progress) return res.status(404).json({ error: 'Progress not found' });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const { lessonsCompleted, quizScores, offlineResourcesDownloaded } = req.body;
    const progress = await LearningProgress.findByIdAndUpdate(req.params.id, { lessonsCompleted, quizScores, offlineResourcesDownloaded, lastUpdated: Date.now() }, { new: true, runValidators: true });
    if (!progress) return res.status(404).json({ error: 'Progress not found' });
    res.json({ message: 'Progress updated', progress });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteProgress = async (req, res) => {
  try {
    const progress = await LearningProgress.findByIdAndDelete(req.params.id);
    if (!progress) return res.status(404).json({ error: 'Progress not found' });
    res.json({ message: 'Progress deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};