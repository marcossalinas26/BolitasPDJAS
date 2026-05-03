const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Usuario y contraseña son requeridos" });
        }
        
        const existingUser = await User.findByUsername(username);
        if (existingUser) {
            return res.status(400).json({ error: "El usuario ya existe" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create(username, hashedPassword);
        res.status(201).json({ message: "Usuario registrado", user: newUser });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findByUsername(username);
        
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.userId = user.id;
            req.session.username = user.username;
            res.redirect('/'); 
        } else {
            res.status(401).json({ error: "Credenciales inválidas" });
        }
    } catch (err) {
        next(err);
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.redirect('/');
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
};
