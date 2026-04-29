const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create(username, hashedPassword);
        res.status(201).json({ message: "Usuario registrado", user: newUser });
    } catch (err) {
        res.status(500).json({ error: "El usuario ya existe o datos inválidos"});
    }
};

exports.login = async (req, res) => {

        const { username, password } = req.body;
        const user = await User.findByUsername(username);
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.userId = user.id; // Guardar ID en sesión
            req.session.username = user.username; // Guardar username en sesión
            res.json({ message: "Login exitoso", user: { id: user.id, username: user.username } });
        }else {
            res.status(401).json({ error: "Credenciales inválidas" });
        }
};
exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};
