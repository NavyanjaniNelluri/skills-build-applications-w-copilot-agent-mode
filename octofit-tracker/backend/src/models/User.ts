import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    profile: {
      displayName: { type: String, default: '' },
      fitnessLevel: { type: String, default: 'beginner' },
    },
  },
  { timestamps: true }
);

export const User = model('User', userSchema);
