"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
require("./models/User");
require("./models/Team");
require("./models/Activity");
require("./models/Leaderboard");
require("./models/Workout");
const activities_1 = require("./routes/activities");
const leaderboard_1 = require("./routes/leaderboard");
const teams_1 = require("./routes/teams");
const users_1 = require("./routes/users");
const workouts_1 = require("./routes/workouts");
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express_1.default.json());
app.use('/api/users', users_1.usersRouter);
app.use('/api/teams', teams_1.teamsRouter);
app.use('/api/activities', activities_1.activitiesRouter);
app.use('/api/leaderboard', leaderboard_1.leaderboardRouter);
app.use('/api/workouts', workouts_1.workoutsRouter);
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
        await mongoose_1.default.connect(mongoUri);
        console.log('MongoDB connected');
    }
    catch (error) {
        console.error('MongoDB connection failed. Starting API without DB connection.', error);
    }
    app.listen(port, () => {
        console.log(`OctoFit backend listening on port ${port}`);
    });
}
void startServer();
//# sourceMappingURL=index.js.map