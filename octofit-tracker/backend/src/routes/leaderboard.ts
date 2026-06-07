import { Router } from 'express';
import { Leaderboard } from '../models/Leaderboard';

export const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req, res) => {
  const leaderboard = await Leaderboard.find().sort({ points: -1 }).limit(100).lean();
  res.status(200).json(leaderboard);
});
