"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const User_1 = require("../models/User");
exports.usersRouter = (0, express_1.Router)();
exports.usersRouter.get('/', async (_req, res) => {
    const users = await User_1.User.find().limit(100).lean();
    res.status(200).json(users);
});
//# sourceMappingURL=users.js.map