const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

app.use(session({
    store: new pgSession({
        pool: db, 
        tableName: 'session' // Nombre de la tabla para sesiones
    }),
    secret: 'mi_secreto_para_seguro',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 días
}));