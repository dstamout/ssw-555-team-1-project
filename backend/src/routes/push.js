import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Register a push token for a user (minimal)
router.post('/register', async (req, res) => {
  const { userId, token } = req.body;
  if (!userId || !token) return res.status(400).json({ error: 'missing fields' });
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'user not found' });
    user.pushTokens = user.pushTokens || [];
    if (!user.pushTokens.includes(token)) user.pushTokens.push(token);
    await user.save();
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'server error' });
  }
});

export default router;
