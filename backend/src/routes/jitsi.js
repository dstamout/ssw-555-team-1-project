import express from 'express';
import jwt from 'jsonwebtoken';
import { authenticateJWT } from '../middleware/authMiddleware.js'; // ✅ manually add this middleware file

const router = express.Router();

// ===== Protected Route: Create Jitsi Room =====
router.post('/room', authenticateJWT, async (req, res) => {
  // Extract room info from request
  const { roomName, userName, userEmail } = req.body;
  if (!roomName) return res.status(400).json({ error: 'roomName required' });

  // Use your Jitsi secret
  const secret = process.env.JITSI_SECRET || 'demo-secret'; // ✅ manually add JITSI_SECRET in .env if needed

  // Payload for Jitsi JWT
  const payload = {
    iss: 'mh-app',               // ✅ optional, can leave as is
    sub: 'meet.jit.si',          // ✅ optional, leave as is
    room: roomName,
    user: {
      name: userName || req.user.displayName || 'Anonymous', // ✅ uses logged-in user's name if not provided
      email: userEmail || req.user.email || '',             // ✅ uses logged-in user's email if not provided
    },
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour expiry
  };

  try {
    // Generate JWT for Jitsi
    const token = jwt.sign(payload, secret);

    res.json({
      room: roomName,
      jwt: token,
      url: `https://meet.jit.si/${roomName}?jwt=${token}`, // ✅ frontend can open this URL
    });
  } catch (err) {
    res.status(500).json({ error: 'JWT generation error', details: err.message });
  }
});

export default router;
