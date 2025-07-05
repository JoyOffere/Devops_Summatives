const express = require('express');
const router = express.Router();
const MentorshipAssignment = require('../models/MentorshipAssignment');

router.post('/', async (req, res) => {
  try {
    const { menteeId, mentorId, checkInSchedule } = req.body;
    const assignment = new MentorshipAssignment({ menteeId, mentorId, checkInSchedule });
    await assignment.save();
    res.status(201).json({ message: 'Mentorship assigned', assignment });
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