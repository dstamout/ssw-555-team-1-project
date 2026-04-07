import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import passport from 'passport';
import { connectDB } from './db.js';
import './auth.js'; // your existing Google OAuth setup
import usersRouter from './routes/users.js';
import moodRouter from './routes/mood.js';
import journalRouter from './routes/journal.js';
import habitsRouter from './routes/habits.js';
import appointmentsRouter from './routes/appointments.js';
import jitsiRouter from './routes/jitsi.js';
import rocketRouter from './routes/rocket.js';
import pushRouter from './routes/push.js';
import authRoutes from './routes/authRoutes.js'; // NEW: email/password + Google JWT

import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

// ===== Connect to DB =====
connectDB();

// ===== Default Route =====
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'mh-comm-backend' });
});

// ===== OAuth Routes (Google) =====
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    // Issue JWT token after successful Google login
    const token = jwt.sign(
      { id: req.user.id, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/oauth-success?token=${token}`);
  }
);

// ===== API Routes =====
app.use('/auth', authRoutes); // NEW: email/password signup/login + Google JWT
app.use('/api/users', usersRouter);
app.use('/api/mood', moodRouter);
app.use('/api/journal', journalRouter);
app.use('/api/habits', habitsRouter);
app.use('/api/appointments', appointmentsRouter);
app.use('/api/jitsi', jitsiRouter);
app.use('/api/rocket', rocketRouter);
app.use('/api/push', pushRouter);

// ===== Start Server =====
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
