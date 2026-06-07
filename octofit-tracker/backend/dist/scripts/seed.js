"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Activity_1 = require("../models/Activity");
const Leaderboard_1 = require("../models/Leaderboard");
const Team_1 = require("../models/Team");
const User_1 = require("../models/User");
const Workout_1 = require("../models/Workout");
const mongoUri = 'mongodb://127.0.0.1:27017/octofit_db';
async function seedDatabase() {
    console.log('Seed the octofit_db database with test data');
    await mongoose_1.default.connect(mongoUri);
    await Promise.all([
        Activity_1.Activity.deleteMany({}),
        Leaderboard_1.Leaderboard.deleteMany({}),
        Team_1.Team.deleteMany({}),
        Workout_1.Workout.deleteMany({}),
        User_1.User.deleteMany({}),
    ]);
    const users = await User_1.User.insertMany([
        {
            username: 'ava.runner',
            email: 'ava.runner@example.com',
            passwordHash: 'hash_ava_runner_001',
            profile: { displayName: 'Ava Runner', fitnessLevel: 'intermediate' },
        },
        {
            username: 'liam.lifter',
            email: 'liam.lifter@example.com',
            passwordHash: 'hash_liam_lifter_002',
            profile: { displayName: 'Liam Lifter', fitnessLevel: 'advanced' },
        },
        {
            username: 'mia.yoga',
            email: 'mia.yoga@example.com',
            passwordHash: 'hash_mia_yoga_003',
            profile: { displayName: 'Mia Flow', fitnessLevel: 'beginner' },
        },
        {
            username: 'noah.cycle',
            email: 'noah.cycle@example.com',
            passwordHash: 'hash_noah_cycle_004',
            profile: { displayName: 'Noah Cycle', fitnessLevel: 'intermediate' },
        },
    ]);
    const [ava, liam, mia, noah] = users;
    await Team_1.Team.insertMany([
        {
            name: 'Cardio Crushers',
            owner: ava._id,
            members: [ava._id, noah._id],
        },
        {
            name: 'Strength Syndicate',
            owner: liam._id,
            members: [liam._id, mia._id],
        },
    ]);
    await Activity_1.Activity.insertMany([
        {
            user: ava._id,
            activityType: '5K Morning Run',
            durationMinutes: 34,
            caloriesBurned: 420,
            completedAt: new Date('2026-06-05T06:40:00Z'),
        },
        {
            user: liam._id,
            activityType: 'Upper Body Strength Session',
            durationMinutes: 52,
            caloriesBurned: 510,
            completedAt: new Date('2026-06-05T17:10:00Z'),
        },
        {
            user: mia._id,
            activityType: 'Vinyasa Yoga Flow',
            durationMinutes: 40,
            caloriesBurned: 220,
            completedAt: new Date('2026-06-06T08:15:00Z'),
        },
        {
            user: noah._id,
            activityType: 'Hill Sprint Cycling',
            durationMinutes: 47,
            caloriesBurned: 560,
            completedAt: new Date('2026-06-06T07:30:00Z'),
        },
    ]);
    await Leaderboard_1.Leaderboard.insertMany([
        { user: liam._id, points: 1380, rank: 1 },
        { user: noah._id, points: 1260, rank: 2 },
        { user: ava._id, points: 1140, rank: 3 },
        { user: mia._id, points: 980, rank: 4 },
    ]);
    await Workout_1.Workout.insertMany([
        {
            title: 'HIIT Burner 25',
            level: 'intermediate',
            focusArea: 'full-body',
            suggestedDurationMinutes: 25,
        },
        {
            title: 'Power Lift Progression',
            level: 'advanced',
            focusArea: 'upper-body',
            suggestedDurationMinutes: 45,
        },
        {
            title: 'Mobility Core Reset',
            level: 'beginner',
            focusArea: 'core',
            suggestedDurationMinutes: 20,
        },
        {
            title: 'Endurance Bike Intervals',
            level: 'intermediate',
            focusArea: 'cardio',
            suggestedDurationMinutes: 35,
        },
    ]);
    console.log('Seeding complete: users, teams, activities, leaderboard, workouts');
}
seedDatabase()
    .catch((error) => {
    console.error('Seed failed', error);
    process.exitCode = 1;
})
    .finally(async () => {
    await mongoose_1.default.disconnect();
});
//# sourceMappingURL=seed.js.map