import mongoose from 'mongoose';

const { Schema } = mongoose;

const HabitEntrySchema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  sleepHours: { type: Number, min: 0, max: 24 },
  exerciseMinutes: { type: Number, min: 0 },
  waterGlasses: { type: Number, min: 0 },
  medicationTaken: { type: Boolean, default: false },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.HabitEntry || mongoose.model('HabitEntry', HabitEntrySchema);