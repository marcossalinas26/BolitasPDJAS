const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');

router.get('/', viewController.renderHome);
router.get('/login', viewController.renderLogin);
router.get('/game/gridshot', viewController.renderGridshot);
router.get('/game/sixshot', viewController.renderSixshot);

module.exports = router;