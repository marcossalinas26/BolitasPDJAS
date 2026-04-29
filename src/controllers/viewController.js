exports.renderLogin = (req, res) => {
    res.render('login');
};

exports.renderHome = (req, res) => {
    // Si NO hay sesión, mandamos al login
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    res.render('index', { username: req.session.username });
};

exports.renderGridshot = (req, res) => { 
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    res.render('game', { mode: 'gridshot', username: req.session.username });
};

exports.renderSixshot = (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    res.render('game', { mode: 'sixshot', username: req.session.username });
};