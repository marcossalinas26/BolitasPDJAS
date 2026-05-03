/**
 * Middleware to restrict access to administrators only.
 * Checks the role stored in the session.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 */
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
