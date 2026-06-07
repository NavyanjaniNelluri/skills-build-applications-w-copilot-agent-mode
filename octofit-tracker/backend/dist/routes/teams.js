"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamsRouter = void 0;
const express_1 = require("express");
const Team_1 = require("../models/Team");
exports.teamsRouter = (0, express_1.Router)();
exports.teamsRouter.get('/', async (_req, res) => {
    const teams = await Team_1.Team.find().limit(100).lean();
    res.status(200).json(teams);
});
//# sourceMappingURL=teams.js.map