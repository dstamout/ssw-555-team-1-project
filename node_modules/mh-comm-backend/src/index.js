import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import passport from 'passport';
import { connectDB } from './db.js';
import './auth.js';
import usersRouter from './routes/users.js';
import moodRouter from './routes/mood.js';
import journalRouter from './routes/journal.js';
import habitsRouter from './routes/habits.js';
import appointmentsRouter from './routes/appointments.js';
import jitsiRouter from './routes/jitsi.js';
import rocketRouter from './routes/rocket.js';
import pushRouter from './routes/push.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

// connect to DB

connectDB();

app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'mh-comm-backend' });
});

// OAuth routes (placeholders, configured in auth.js)
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  // In a real app, issue JWT or set session and redirect
  res.json({ message: 'OAuth callback - implement redirect', user: req.user });
});

app.use('/api/users', usersRouter);
app.use('/api/mood', moodRouter);
app.use('/api/journal', journalRouter);
app.use('/api/habits', habitsRouter);
app.use('/api/appointments', appointmentsRouter);
app.use('/api/jitsi', jitsiRouter);
app.use('/api/rocket', rocketRouter);
app.use('/api/push', pushRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
