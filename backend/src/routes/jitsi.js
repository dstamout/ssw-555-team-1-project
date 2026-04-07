import express from 'express';
import jwt from 'jsonwebtoken';
import { authenticateJWT } from '../middleware.js'; 

const router = express.Router();

// ===== Protected Route: Create Jitsi Room =====
router.post('/room', authenticateJWT, async (req, res) => {
  // Extract room info from request
  const { roomName, userName, userEmail } = req.body;
  if (!roomName) return res.status(400).json({ error: 'roomName required' });

  // Use your Jitsi secret
  const secret = process.env.JITSI_SECRET || 'demo-secret'; 

  // Payload for Jitsi JWT
  const payload = {
    iss: 'mh-app',               
    sub: 'meet.jit.si',          
    room: roomName,
    user: {
      name: userName || req.user.displayName || 'Anonymous', 
      email: userEmail || req.user.email || '',            
    },
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour expiry
  };

  try {
    // Generate JWT for Jitsi
    const token = jwt.sign(payload, secret);

    res.json({
      room: roomName,
      jwt: token,
      url: `https://meet.jit.si/${roomName}?jwt=${token}`, 
    });
  } catch (err) {
    res.status(500).json({ error: 'JWT generation error', details: err.message });
  }
});

export default router;
