import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // skip if password not changed

  if (this.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
      return next(err);
    }
  }
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false; // for Google OAuth users
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.User || mongoose.model('User', UserSchema);
