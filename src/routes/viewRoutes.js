const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/login', viewController.renderLogin);
router.get('/', viewController.renderHome);


router.get('/game/gridshot', authMiddleware, viewController.renderGridshot);
router.get('/game/sixshot', authMiddleware, viewController.renderSixshot);

module.exports = router;
