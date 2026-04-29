const pool = require('../config/db');

const User = {
    // Crear un nuevo usuario
    async create(username, password) {
        const query = `
            INSERT INTO usuarios (username, password) VALUES ($1, $2) RETURNING id, username`;
        const { rows } = await pool.query(query, [username, password]);
        return rows[0];
    },

    // Obtener usuario por username
    async findByUsername(username) {
        const query = `SELECT * FROM usuarios WHERE username = $1`;
        const { rows } = await pool.query(query, [username]);
        return rows[0];
    }
};

module.exports = User; 