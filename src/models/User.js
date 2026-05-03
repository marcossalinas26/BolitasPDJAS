const pool = require('../../config/db');

const User = {
  
    async create(username, password) {
        const query = `
            INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username`;
        const { rows } = await pool.query(query, [username, password]);
        return rows[0];
    },

   
    async findByUsername(username) {
        const res = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        return res.rows[0];
    }
};

module.exports = User; 