const { GameMode, User, Score } = require('../models');

/**
 * Renders the login page.
 * Redirects to home if user is already logged in.
 */
exports.renderLogin = (req, res) => {
    if (req.session.userId) {
        return res.redirect('/');
    }
    res.render('login');
};

/**
 * Renders the home page with available game modes.
 */
exports.renderHome = async (req, res, next) => {
    try {
        const modes = await GameMode.findAll();
        res.render('index', { 
            username: req.session.username || null,
            role: req.session.role || null,
            modes,
            mode: 'home' 
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Renders the game page for a specific mode.
 */
exports.renderGame = async (req, res, next) => {
    try {
        const { modeName } = req.params;
        const gameMode = await GameMode.findOne({ where: { name: modeName } });
        
        if (!gameMode) {
            return res.status(404).render('error', { message: 'Modo de juego no encontrado' });
        }

        res.render('game', { 
            mode: gameMode.name, 
            config: gameMode,
            username: req.session.username 
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Renders the admin dashboard.
 */
exports.renderAdmin = async (req, res, next) => {
    try {
        const usersCount = await User.count();
        const scoresCount = await Score.count();
        const modes = await GameMode.findAll();
        
        res.render('admin', {
            username: req.session.username,
            usersCount,
            scoresCount,
            modes
        });
    } catch (err) {
        next(err);
    }
};