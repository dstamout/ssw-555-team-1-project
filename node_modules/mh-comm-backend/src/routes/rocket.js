import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const RC_URL = process.env.ROCKET_URL || 'http://localhost:3000';

// Proxy login to Rocket.Chat using server credentials (minimal)
router.post('/login', async (req, res) => {
  try {
    const { userId, password } = req.body; // optional: allow user pass-through
    // If server admin credentials provided, use them to get admin token
    if (process.env.ROCKET_ADMIN_USER && process.env.ROCKET_ADMIN_PASS) {
      const resp = await axios.post(`${RC_URL}/api/v1/login`, {
        user: process.env.ROCKET_ADMIN_USER,
        password: process.env.ROCKET_ADMIN_PASS
      });
      return res.json(resp.data);
    }
    // else, attempt to login with provided credentials
    if (userId && password) {
      const resp = await axios.post(`${RC_URL}/api/v1/login`, { user: userId, password });
      return res.json(resp.data);
    }
    return res.status(400).json({ error: 'no credentials available' });
  } catch (err) {
    return res.status(500).json({ error: 'rocket proxy error', details: err.message });
  }
});

export default router;
