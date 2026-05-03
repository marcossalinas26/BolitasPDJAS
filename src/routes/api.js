const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Public endpoints
router.get('/ranking/:gameType', gameController.getRanking);
router.get('/game-modes', gameController.getGameModes);

// Authenticated user endpoints
router.use(authMiddleware);
router.post('/score', gameController.postScore);

// Admin-only endpoints
router.post('/game-modes', adminMiddleware, gameController.createGameMode);
router.delete('/game-modes/:id', adminMiddleware, gameController.deleteGameMode);
router.delete('/score/:id', adminMiddleware, gameController.deleteScore);

module.exports = router;