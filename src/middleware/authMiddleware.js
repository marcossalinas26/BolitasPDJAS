module.exports = (req, res, next) => {
    if (!req.session.userId) {
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            return res.status(401).json({ status: 'error', message: 'No autorizado' });
        }
        return res.redirect('/login');
    }
    next();
};
