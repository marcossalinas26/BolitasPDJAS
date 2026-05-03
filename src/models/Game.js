const pool = require('../../config/db'); 
const Game = {
   
    async saveScore(userId, gameType, points, accuracy) {
        const query = `
            INSERT INTO scores (user_id, game_type, points, accuracy)
            VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [userId, gameType, points, accuracy];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

   
    async getLeaderboard(gameType) {
        const query = `
            SELECT u.username, s.points, s.accuracy, s.created_at
            FROM scores s
            JOIN users u ON s.user_id = u.id
            WHERE s.game_type = $1
            ORDER BY s.points DESC
            LIMIT 10`;
        const { rows } = await pool.query(query, [gameType]);
        return rows;
    }
}
module.exports = Game;