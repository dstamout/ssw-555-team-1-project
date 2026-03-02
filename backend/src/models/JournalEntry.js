import mongoose from 'mongoose';

const { Schema } = mongoose;

const JournalEntrySchema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String },
  content: { type: String, required: true },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.JournalEntry || mongoose.model('JournalEntry', JournalEntrySchema);
