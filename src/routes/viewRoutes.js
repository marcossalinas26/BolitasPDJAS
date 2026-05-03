const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Public views
router.get('/login', viewController.renderLogin);
router.get('/', viewController.renderHome);

// Protected views
router.get('/game/:modeName', authMiddleware, viewController.renderGame);

// Admin views
router.get('/admin', authMiddleware, adminMiddleware, viewController.renderAdmin);

module.exports = router;
