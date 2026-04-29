const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Ruta para guardar puntos
router.post('/score', gameController.postScore);

// Ruta para ver el ranking
router.get('/ranking/:gameType', gameController.getRanking);

module.exports = router;