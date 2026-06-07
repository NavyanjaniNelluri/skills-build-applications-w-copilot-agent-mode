"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workoutsRouter = void 0;
const express_1 = require("express");
const Workout_1 = require("../models/Workout");
exports.workoutsRouter = (0, express_1.Router)();
exports.workoutsRouter.get('/', async (_req, res) => {
    const workouts = await Workout_1.Workout.find().limit(100).lean();
    res.status(200).json(workouts);
});
//# sourceMappingURL=workouts.js.map