"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaderboardRouter = void 0;
const express_1 = require("express");
const Leaderboard_1 = require("../models/Leaderboard");
exports.leaderboardRouter = (0, express_1.Router)();
exports.leaderboardRouter.get('/', async (_req, res) => {
    const leaderboard = await Leaderboard_1.Leaderboard.find().sort({ points: -1 }).limit(100).lean();
    res.status(200).json(leaderboard);
});
//# sourceMappingURL=leaderboard.js.map