"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = void 0;
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    level: { type: String, default: 'beginner' },
    focusArea: { type: String, default: 'full-body' },
    suggestedDurationMinutes: { type: Number, default: 20, min: 1 },
}, { timestamps: true });
exports.Workout = (0, mongoose_1.model)('Workout', workoutSchema);
//# sourceMappingURL=Workout.js.map