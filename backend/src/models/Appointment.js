import mongoose from 'mongoose';

const { Schema } = mongoose;

const AppointmentSchema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  clinician: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  requestedDate: { type: Date, required: true },
  status: { type: String, enum: ['requested', 'approved', 'declined'], default: 'requested' },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);