const { User } = require('../models');
const bcrypt = require('bcrypt');

/**
 * Controller for user registration.
 * Hashes password and creates a new user in the database.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 */
exports.register = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ status: 'error', message: "Usuario y contraseña son requeridos" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await User.create({
            username,
            password: hashedPassword,
            role: 'user' // Explicitly set to user
        });

        res.status(201).json({ 
            status: 'success', 
            message: "Usuario registrado con éxito", 
            user: { id: newUser.id, username: newUser.username } 
        });

    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ status: 'error', message: "El nombre de usuario ya existe" });
        }
        console.error("❌ ERROR EN REGISTRO:", err);
        next(err);
    }
};

/**
 * Controller for user login.
 * Validates credentials and creates a session.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 */
exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        
        const user = await User.findOne({ where: { username } });

        if (user && await bcrypt.compare(password, user.password)) {
            req.session.userId = user.id;
            req.session.username = user.username;
            req.session.role = user.role; // Save role in session
            res.redirect('/');
        } else {
            res.status(401).json({ status: 'error', message: "Credenciales inválidas" });
        }
    } catch (err) {
        console.error("❌ ERROR EN LOGIN:", err);
        next(err);
    }
};

/**
 * Controller for user logout.
 * Destroys session and clears cookies.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.redirect('/');
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
};
