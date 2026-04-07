import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import User from '../models/User.js';
import { authenticateJWT } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password, displayName, role } = req.body;
    if (!email || !password) return res.status(400).json({ msg: 'Email & password required' });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    const user = new User({
      email,
      password, // hashed automatically by your User model pre-save hook
      displayName: displayName || 'Anonymous',
      role: role || 'patient',
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      user: { id: user._id, email: user.email, displayName: user.displayName, role: user.role },
      token
    });
  } catch (err) {
    res.status(500).json({ msg: 'Signup failed', error: err.message });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: 'Email & password required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const match = await user.comparePassword(password); // uses your model method
    if (!match) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      user: { id: user._id, email: user.email, displayName: user.displayName, role: user.role },
      token
    });
  } catch (err) {
    res.status(500).json({ msg: 'Login failed', error: err.message });
  }
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user.id, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Google OAuth login successful',
      user: req.user,
      token
    });
  }
);

router.get('/clinicians', async (req, res) => {
  try {
    const clinicians = await User.find({ role: 'clinician' }).select('_id email displayName role');
    res.json(clinicians);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to load clinicians', error: err.message });
  }
});

router.get('/me', authenticateJWT, (req, res) => {
  res.json({ user: req.user });
});

export default router;
