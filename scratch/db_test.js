const User = require('../src/models/User');
const Game = require('../src/models/Game');

async function test() {
    try {
        console.log("Testing Database Models...");
        
        // Test User find
        const user = await User.findByUsername('testuser');
        console.log("User find test:", user ? "Found" : "Not found (ok if first time)");

        // Test Leaderboard
        const lb = await Game.getLeaderboard('gridshot');
        console.log("Leaderboard test:", lb.length, "rows found");

        console.log("Database models seem to be working!");
        process.exit(0);
    } catch (err) {
        console.error("DATABASE MODEL ERROR:", err);
        process.exit(1);
    }
}

test();
