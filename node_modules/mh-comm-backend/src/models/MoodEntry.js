import mongoose from 'mongoose';

const { Schema } = mongoose;

const MoodEntrySchema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  mood: { type: String, required: true },
  intensity: { type: Number, min: 0, max: 10 },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.MoodEntry || mongoose.model('MoodEntry', MoodEntrySchema);
