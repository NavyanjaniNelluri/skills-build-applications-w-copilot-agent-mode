import { Router } from 'express';
import { Workout } from '../models/Workout';

export const workoutsRouter = Router();

workoutsRouter.get('/', async (_req, res) => {
  const workouts = await Workout.find().limit(100).lean();
  res.status(200).json(workouts);
});
