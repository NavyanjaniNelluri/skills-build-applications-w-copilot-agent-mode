import { Router } from 'express';
import { User } from '../models/User';

export const usersRouter = Router();

usersRouter.get('/', async (_req, res) => {
  const users = await User.find().limit(100).lean();
  res.status(200).json(users);
});
