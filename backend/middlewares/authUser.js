const jwt = require('jsonwebtoken');
const { User } = require("../config/dbConfig");
const cryptojs = require("crypto-js");
const Cookies = require("cookies");

// identifier le user et vérifier son token
exports.checkUser = (req, res, next) => {
    try {
        const cryptedCookie = new Cookies(req, res).get('snToken');
        console.log("my2", cryptedCookie);
        const cookie = JSON.parse(cryptojs.AES.decrypt(cryptedCookie, process.env.COOKIE_KEY).toString(cryptojs.enc.Utf8))

        const token = jwt.verify(cookie.token, process.env.SECRET_KEY);
        console.log("token01", token);
        if (cookie.userId && cookie.userId !== token.userId) {
            throw "User ID non valable";
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: 'Requête non authentifiée' });
    }

};

// contrôler l'utilisateur et via la route get /jwtid envoyer au frontend le res.locals.user.id
module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwtCookie;
    //console.log(token);
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, async(err, decodedToken) => {
            if (err) {
                //console.log(err);
                res.status(200).json('no token')
            } else {
                //console.log("decodedToken.userId", decodedToken.userId);
                //console.log("res.locals.user", res.locals.user);
                next();
            }
        });
    } else {
        return res.status(400).json({ error: 'No token!' });
    }
};