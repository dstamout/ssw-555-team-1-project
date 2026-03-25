import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/room', async (req, res) => {
  const { roomName, userName, userEmail } = req.body;
  if (!roomName) return res.status(400).json({ error: 'roomName required' });

  const secret = process.env.JITSI_SECRET || 'demo-secret';
  const payload = {
    iss: 'mh-app', 
    sub: 'meet.jit.si', 
    room: roomName,
    user: {
      name: userName || 'Anonymous',
      email: userEmail || '',
    },
    exp: Math.floor(Date.now() / 1000) + (60 * 60), 
  };

  try {
    const token = jwt.sign(payload, secret);
    res.json({
      room: roomName,
      jwt: token,
      url: `https://meet.jit.si/${roomName}?jwt=${token}`
    });
  } catch (err) {
    res.status(500).json({ error: 'jwt error' });
  }
});

export default router;