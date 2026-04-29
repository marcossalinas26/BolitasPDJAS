exports.renderLogin = (req, res) => {
    res.render('login');
};

exports.renderHome = (req, res) => {
    if (req.session.userId) {
        return res.redirect('/login');
    }
    res.render('index', { username: req.session.username });

}
exports.renderGrishot = (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
        res.render('grishot', { mode:'grishot', username: req.session.username });
    };}

exports.renderSixshot = (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
        res.render('sixshot', { mode:'sixshot', username: req.session.username });
    };
}