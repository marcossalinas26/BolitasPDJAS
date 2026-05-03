exports.renderLogin = (req, res) => {
    if (req.session.userId) {
        return res.redirect('/');
    }
    res.render('login');
};

exports.renderHome = (req, res) => {
    res.render('index', { 
        username: req.session.username || null,
        mode: 'home' 
    });
};

exports.renderGridshot = (req, res) => {
    res.render('game', { mode: 'gridshot', username: req.session.username });
};

exports.renderSixshot = (req, res) => {
    res.render('game', { mode: 'sixshot', username: req.session.username });
};