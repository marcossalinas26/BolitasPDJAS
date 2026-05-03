require('dotenv').config();
const express = require('express'); 
const path = require('path');       
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const morgan = require('morgan');
const db = require('../config/db');

// Rutas
const viewRoutes = require('./routes/viewRoutes');
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');

const app = express(); 

// View Engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    store: new pgSession({
        pool: db,
        tableName: 'session'
    }),
    secret: process.env.SESSION_SECRET || 'fallback_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production' 
    }
}));

// Logs de solicitudes
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Uso de Rutas
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/', viewRoutes);

// 404 Handler
app.use((req, res, next) => {
    res.status(404).render('error', { message: 'Página no encontrada' });
});

// Centralized Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ status: 'error', message: 'Algo salió mal en el servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor funcionando en http://localhost:${PORT}`);
});