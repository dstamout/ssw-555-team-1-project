import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: ['patient', 'clinician'], required: true },
  displayName: { type: String },
  googleId: { type: String },
  trustedContacts: [{ type: String }],
  pushTokens: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
