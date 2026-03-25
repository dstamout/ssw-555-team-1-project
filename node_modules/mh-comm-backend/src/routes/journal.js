import express from 'express';
import JournalEntry from '../models/JournalEntry.js';

const router = express.Router();

// Create journal entry
router.post('/', async (req, res) => {
  const { patientId, title, content, tags } = req.body;
  if (!patientId || !content) return res.status(400).json({ error: 'missing fields' });
  try {
    const j = new JournalEntry({ patient: patientId, title, content, tags });
    await j.save();
    res.json(j);
  } catch (err) {
    res.status(500).json({ error: 'server error' });
  }
});

// List journal entries for a patient
router.get('/patient/:id', async (req, res) => {
  try {
    const entries = await JournalEntry.find({ patient: req.params.id }).sort({ createdAt: -1 }).limit(100);
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: 'server error' });
  }
});

export default router;
