const jwt = require('../lib/jwt');
const { SECRET } = require('../constans')

exports.auth = async (req, res, next) => {
    const token = req.cookies['token'];

    if (token) {
        try {
            const user = await jwt.verify(token, SECRET);
            req.user = user;
            res.locals.user = user;
            res.locals.isAuth = true;
            next();
        } catch (error) {
            console.log({ error });
            res.clearCookie(user,'token');
            res.redirect('/users/login');
        }
        return;
    }
    next();
};

exports.isAuth = (req, res) => {
    if (!req.user) {
        return res.redirect('/users/login');
    }
    next();
}