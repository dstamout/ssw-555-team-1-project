import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { connectDB } from '../src/db.js';
import User from '../src/models/User.js';
import Appointment from '../src/models/Appointment.js';

dotenv.config();

const seed = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // optional: clear existing data
    await User.deleteMany({});
    await Appointment.deleteMany({});

    const password = await bcrypt.hash('password123', 10);

    const patient = await User.create({
      email: 'seed-patient@example.com',
      password,
      role: 'patient',
      displayName: 'Seed Patient',
    });

    const clinician = await User.create({
      email: 'seed-clinician@example.com',
      password,
      role: 'clinician',
      displayName: 'Seed Clinician',
    });

    await Appointment.create({
      patient: patient._id,
      clinician: clinician._id,
      requestedDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
      status: 'requested',
      notes: 'Seed appointment',
    });

    console.log('Seed complete:');
    console.log('  patient email:', patient.email, 'password: password123');
    console.log('  clinician email:', clinician.email, 'password: password123');
  } catch (error) {
    console.error('Seed failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Disconnected');
  }
};

seed();