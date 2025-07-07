const PortfolioProject = require('../models/PortfolioProject');

exports.createProject = async (req, res) => {
  try {
    const { userId, projectTitle, description, challengeId } = req.body;
    const project = new PortfolioProject({ userId, projectTitle, description, challengeId });
    await project.save();
    res.status(201).json({ message: 'Project submitted', project });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProject = async (req, res) => {
  try {
    const project = await PortfolioProject.findById(req.params.id).populate('userId');
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { status, feedback } = req.body;
    const project = await PortfolioProject.findByIdAndUpdate(req.params.id, { status, feedback }, { new: true, runValidators: true });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json({ message: 'Project updated', project });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await PortfolioProject.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};