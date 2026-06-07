import express from 'express';
import mongoose from 'mongoose';

import './models/User';
import './models/Team';
import './models/Activity';
import './models/Leaderboard';
import './models/Workout';
import { activitiesRouter } from './routes/activities';
import { leaderboardRouter } from './routes/leaderboard';
import { teamsRouter } from './routes/teams';
import { usersRouter } from './routes/users';
import { workoutsRouter } from './routes/workouts';

const app = express();
const port = Number(process.env.PORT) || 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    service: 'octofit-backend',
    status: 'ok',
    port,
  });
});

app.get('/api/meta', (_req, res) => {
  res.status(200).json({
    baseUrl,
    mongoDb: 'octofit_db',
    mongoUri,
  });
});

async function startServer() {
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed. Starting API without DB connection.', error);
  }

  app.listen(port, () => {
    console.log(`OctoFit backend listening on port ${port}`);
  });
}

void startServer();
