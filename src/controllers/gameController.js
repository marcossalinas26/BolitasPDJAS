const Game = require('../models/Game');

exports.postScore = async (req, res, next) => {
    try {
        const { points, accuracy, gameType } = req.body;
        const userId = req.session.userId;

        if (!userId) {
            return res.status(401).json({ status: 'error', message: 'Debe iniciar sesión' });
        }

        const newScore = await Game.saveScore(userId, gameType, points, accuracy);
        res.status(201).json({ status: 'success', data: newScore });
    } 
    catch (error) {
        next(error);
    }
}; 

exports.getRanking = async (req, res, next) => {
    try {
        const { gameType } = req.params;
        const leaderboard = await Game.getLeaderboard(gameType);
        res.json({ status: 'success', data: leaderboard });
    }
    catch (error) {
        next(error);
    }
};