const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');
const User: any = user;
const

    module.exports = (req, res, next) => {
    const token = req.cookies.jwt; // récupérer le token dans le cookie
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, async(err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.cookie('jwtCookie', '', { maxAge: 1 });
                next();
            } else {
                let user = await UserModel.findByPk(decodedToken.id);
                console.log(bb);
                res.locals.user = user;
                next();
            }
        });
    } else { // si pas de token
        res.locals.user = null;
        next();
    }
}