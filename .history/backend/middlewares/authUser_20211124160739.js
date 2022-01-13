const jwt = require('jsonwebtoken');
const { User } = require("../config/dbConfig");
const cookieParser = require('cookie-parser');

exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwtCookie; // récupérer le token dans le cookie
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, async(err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.cookie('jwtCookie', '', { maxAge: 1 });
                console.log("bb");
                console.log("bb");
                next();
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else { // si pas de token
        res.locals.user = null;
        console.log("bbb");
        next();
    }
};