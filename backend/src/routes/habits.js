import express from 'express';
import HabitEntry from '../models/HabitEntry.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { patientId, date, sleepHours, exerciseMinutes, waterGlasses, medicationTaken, notes } = req.body;
  if (!patientId) return res.status(400).json({ error: 'missing patientId' });
  try {
    const h = new HabitEntry({ patient: patientId, date, sleepHours, exerciseMinutes, waterGlasses, medicationTaken, notes });
    await h.save();
    res.json(h);
  } catch (err) {
    res.status(500).json({ error: 'server error' });
  }
});


router.get('/patient/:id', async (req, res) => {
  try {
    const entries = await HabitEntry.find({ patient: req.params.id }).sort({ createdAt: -1 }).limit(100);
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: 'server error' });
  }
});

export default router;