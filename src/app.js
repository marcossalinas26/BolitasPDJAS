const express = require('express'); 
const path = require('path');       
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const db = require('../config/db');
// Rutas
const viewRoutes = require('./routes/viewRoutes');
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');

const app = express(); 

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    store: new pgSession({
        pool: db,
        tableName: 'session'
    }),
    secret: 'mi_secreto_para_seguro',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
}));

// Uso de Rutas

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/', viewRoutes);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor funcionando en http://localhost:${PORT}`);
});