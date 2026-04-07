import mongoose from 'mongoose';

const { Schema } = mongoose;

const AppointmentSchema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  clinician: { type: Schema.Types.ObjectId, ref: 'User', required: true },

  // Scheduling
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },

  // Status
  status: { 
    type: String, 
    enum: ['requested', 'approved', 'declined'], 
    default: 'requested' 
  },

  // Jitsi meeting link
  meetingLink: { type: String },

  // Extra info
  notes: { type: String },

  // Tracking
  approvedAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);
