const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');


router.get('/ranking/:gameType', gameController.getRanking);
router.get('/game-modes', gameController.getGameModes);


router.use(authMiddleware);
router.post('/score', gameController.postScore);


router.post('/game-modes', adminMiddleware, gameController.createGameMode);
router.delete('/game-modes/:id', adminMiddleware, gameController.deleteGameMode);
router.delete('/score/:id', adminMiddleware, gameController.deleteScore);

module.exports = router;