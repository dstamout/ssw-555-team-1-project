import express from "express";
import Appointment from "../models/appointment.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { patient, clinician, startTime, endTime, notes } = req.body;

    // Validation
    if (!patient || !clinician || !startTime || !endTime) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Conflict check
    const conflict = await Appointment.findOne({
      clinician,
      status: "approved",
      $or: [
        {
          startTime: { $lt: endTime },
          endTime: { $gt: startTime }
        }
      ]
    });

    if (conflict) {
      return res.status(400).json({ message: "Time slot already booked" });
    }

    // Create appointment
    const appointment = new Appointment({
      patient,
      clinician,
      startTime,
      endTime,
      notes
    });

    // Jitsi meeting link
    appointment.meetingLink = `https://meet.jit.si/${appointment._id}`;

    await appointment.save();

    res.status(201).json(appointment);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient clinician");

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("patient clinician");

    if (!appointment) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id/approve", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Not found" });
    }

    appointment.status = "approved";
    appointment.approvedAt = new Date();

    await appointment.save();

    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id/decline", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Not found" });
    }

    appointment.status = "declined";

    await appointment.save();

    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: "Appointment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
