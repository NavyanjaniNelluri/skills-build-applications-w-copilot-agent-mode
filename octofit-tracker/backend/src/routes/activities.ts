import { Router } from 'express';
import { Activity } from '../models/Activity';

export const activitiesRouter = Router();

activitiesRouter.get('/', async (_req, res) => {
  const activities = await Activity.find().sort({ completedAt: -1 }).limit(100).lean();
  res.status(200).json(activities);
});
