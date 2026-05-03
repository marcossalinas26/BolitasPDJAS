module.exports = (req, res, next) => {
    if (req.session && req.session.role === 'admin') {
        next();
    } else {
        res.status(403).json({ 
            status: 'error', 
            message: 'Acceso denegado: Se requieren permisos de administrador' 
        });
    }
};
