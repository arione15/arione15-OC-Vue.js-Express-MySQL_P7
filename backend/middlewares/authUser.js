const jwt = require('jsonwebtoken');
const { User } = require("../config/dbConfig");

// identifier le user et vérifier son token
exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwtCookie; // récupérer le token dans le cookie
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, async(err, decodedToken) => {
            if (err) { //si erreur, on retire le cookie :
                res.locals.user = null;
                res.cookie('jwtCookie', '', { maxAge: 1 });
                next();
            } else {
                //console.log('decodedToken', decodedToken);
                let user = await User.findByPk(decodedToken.userId);
                res.locals.user = user;
                req.userId = user.id // Add to req object
                    //console.log("res.locals.user", res.locals.user);
                next();
            }
        });
    } else { // si pas de token
        res.locals.user = null;
        next();
    }
};

// contrôler l'utilisateur et via la route envoyer au frontend le res.locals.usr.id
module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwtCookie;
    console.log(token);
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, async(err, decodedToken) => {
            if (err) {
                console.log(err);
                res.status(200).json('no token')
            } else {
                console.log("decodedToken.userId", decodedToken.userId);
                console.log("res.locals.user", res.locals.user);
                next();
            }
        });
    } else {
        console.log('No token');
    }
};