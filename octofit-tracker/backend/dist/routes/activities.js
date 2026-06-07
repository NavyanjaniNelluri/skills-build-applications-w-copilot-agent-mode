"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activitiesRouter = void 0;
const express_1 = require("express");
const Activity_1 = require("../models/Activity");
exports.activitiesRouter = (0, express_1.Router)();
exports.activitiesRouter.get('/', async (_req, res) => {
    const activities = await Activity_1.Activity.find().sort({ completedAt: -1 }).limit(100).lean();
    res.status(200).json(activities);
});
//# sourceMappingURL=activities.js.map