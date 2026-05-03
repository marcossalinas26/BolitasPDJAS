const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/login', viewController.renderLogin);
router.get('/', viewController.renderHome);

router.get('/game/:modeName', authMiddleware, viewController.renderGame);

router.get('/admin', authMiddleware, adminMiddleware, viewController.renderAdmin);

module.exports = router;
