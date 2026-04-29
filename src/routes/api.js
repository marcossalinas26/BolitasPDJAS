const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Ruta para guardar puntos al terminar el juego
router.post('/score', gameController.postScore);

// Ruta para ver el ranking de un juego específico
router.get('/ranking/:gameType', gameController.getRanking);

module.exports = router;