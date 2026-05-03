const { User } = require('../models');
const bcrypt = require('bcrypt');

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
            role: 'user'
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


exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ where: { username } });

        if (user && await bcrypt.compare(password, user.password)) {
            req.session.userId = user.id;
            req.session.username = user.username;
            req.session.role = user.role; 
            res.redirect('/');
        } else {
            res.status(401).json({ status: 'error', message: "Credenciales inválidas" });
        }
    } catch (err) {
        console.error("❌ ERROR EN LOGIN:", err);
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
