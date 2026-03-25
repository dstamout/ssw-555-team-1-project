import express from 'express';
import MoodEntry from '../models/MoodEntry.js';

const router = express.Router();

// Create mood entry
router.post('/', async (req, res) => {
  const { patientId, mood, intensity, notes } = req.body;
  if (!patientId || !mood) return res.status(400).json({ error: 'missing fields' });
  try {
    const m = new MoodEntry({ patient: patientId, mood, intensity, notes });
    await m.save();
    res.json(m);
  } catch (err) {
    res.status(500).json({ error: 'server error' });
  }
});

// List moods for a patient
router.get('/patient/:id', async (req, res) => {
  try {
    const entries = await MoodEntry.find({ patient: req.params.id }).sort({ createdAt: -1 }).limit(100);
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: 'server error' });
  }
});

export default router;
