const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/ranking/:gameType', gameController.getRanking);


router.use(authMiddleware);


router.post('/score', gameController.postScore);

module.exports = router;