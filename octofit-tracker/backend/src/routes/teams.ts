import { Router } from 'express';
import { Team } from '../models/Team';

export const teamsRouter = Router();

teamsRouter.get('/', async (_req, res) => {
  const teams = await Team.find().limit(100).lean();
  res.status(200).json(teams);
});
