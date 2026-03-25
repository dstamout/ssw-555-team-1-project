import express from 'express';
import Appointment from '../models/Appointment.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { patientId, clinicianId, requestedDate, notes } = req.body;
    if (!patientId || !clinicianId || !requestedDate) {
      return res.status(400).json({ error: 'patientId, clinicianId, and requestedDate are required' });
    }

    const appointment = new Appointment({
      patient: patientId,
      clinician: clinicianId,
      requestedDate,
      notes,
    });

    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    console.error('Error creating appointment', err);
    res.status(500).json({ error: 'Error creating appointment' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { userId, role } = req.query;
    if (!userId || !role) {
      return res.status(400).json({ error: 'userId and role are required in query' });
    }

    const query = role === 'clinician' ? { clinician: userId } : { patient: userId };

    const appointments = await Appointment.find(query)
      .populate('patient', 'name email')
      .populate('clinician', 'name email')
      .sort({ requestedDate: 1 });

    res.json(appointments);
  } catch (err) {
    console.error('Error fetching appointments', err);
    res.status(500).json({ error: 'Error fetching appointments' });
  }
});

router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['approved', 'declined'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (err) {
    console.error('Error updating appointment status', err);
    res.status(500).json({ error: 'Error updating appointment status' });
  }
});

export default router;
