import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password, role, displayName } = req.body;
  if (!email || !password || !role) return res.status(400).json({ error: 'missing fields' });
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: 'email exists' });
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashed, role, displayName });
    await user.save();
    res.json({ id: user._id, email: user.email, role: user.role });
  } catch (err) {
    res.status(500).json({ error: 'server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const u = await User.findById(req.params.id).select('-password');
    if (!u) return res.status(404).json({ error: 'not found' });
    res.json(u);
  } catch (err) {
    res.status(500).json({ error: 'server error' });
  }
});

export default router;
