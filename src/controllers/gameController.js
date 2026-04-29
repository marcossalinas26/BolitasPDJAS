const Game = require('../models/Game');

exports.postScore = async (req, res) => {
    try {
        const { points, accuracy, gameType } = req.body;
        
        
        const userId = req.session.userId || 1;

        const newScore = await Game.saveScore(userId, gameType, points, accuracy);
        res.status(201).json({ status: 'success', data: newScore });
    } 
    catch (error) {
        console.error("Error en postScore:", error);
        res.status(500).json({ status: 'error', message: 'Error saving score' });
    }
}; 

exports.getRanking = async (req, res) => {
    try {
        const { gameType } = req.params;
        const leaderboard = await Game.getLeaderboard(gameType);
        res.json(leaderboard);
    }
    catch (error) {
        console.error("Error en getRanking:", error);
        res.status(500).json({ status: 'error', message: 'Error fetching leaderboard' });
    }
};