const jwt = require('jsonwebtoken');
const { User } = require("../config/dbConfig");

exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwtCookie; // récupérer le token dans le cookie
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, async(err, decodedToken) => {
            if (err) { //si erreur, on retire le cookie :
                res.locals.user = null;
                res.cookie('jwtCookie', '', { maxAge: 1 });
                next();
            } else {
                let user = await User.findByPk(decodedToken.userId);
                req.userId = user.id // Add to req object
                    //res.locals.user = user;
                    //console.log(res.locals.user);
                next();
            }
        });
    } else { // si pas de token
        res.locals.user = null;
        next();
    }
};