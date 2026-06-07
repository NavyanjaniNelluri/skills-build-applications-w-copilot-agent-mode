import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    level: { type: String, default: 'beginner' },
    focusArea: { type: String, default: 'full-body' },
    suggestedDurationMinutes: { type: Number, default: 20, min: 1 },
  },
  { timestamps: true }
);

export const Workout = model('Workout', workoutSchema);
