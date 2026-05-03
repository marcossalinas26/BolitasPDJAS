const Game = require('../models/Game');

exports.saveScore = async (req, res) => {
    const { points, game_type } = req.body;
    const userId = req.session.userId; 

    try {
        await db.query(
            'INSERT INTO scores (user_id, game_type, points) VALUES ($1, $2, $3)',
            [userId, game_type, points]
        );
        res.status(200).json({ message: "Puntuación guardada" });
    } catch (err) {
        res.status(500).json({ error: "Error al guardar" });
    }
};