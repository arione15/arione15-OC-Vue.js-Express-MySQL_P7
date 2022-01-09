const jwt = require('jsonwebtoken');
const db = require("../config/db");
const cryptojs = require("crypto-js");
const Cookies = require('cookies');

const User = db.User;

// identifier le user et vérifier son token
exports.checkUser = async(req, res, next) => {
    //const cryptedToken = new Cookies(req, res).get('snToken');
    try {
        const cryptedCookie = new Cookies(req, res).get('snToken');
        console.log("666", cryptedCookie);

        const cookie = JSON.parse(cryptojs.AES.decrypt(cryptedCookie, process.env.COOKIE_KEY).toString(cryptojs.enc.Utf8))
        const token = jwt.verify(cookie.token, process.env.COOKIE_KEY);
        if (!cookie || (cookie.userId && cookie.userId !== token.userId)) {
            throw "User ID non valable";
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json("err");
    }
}

// contrôler l'utilisateur et via la route get /jwtid envoyer au frontend le id (res.locals.user.id)
module.exports.requireAuth = async(req, res, next) => {

    const cryptedToken = req.cookies.snToken;

    console.log('err-requireAuth');

    const tokenDecrypted = cryptojs.AES.decrypt(cryptedToken, process.env.COOKIE_KEY);
    const cookie = JSON.parse(tokenDecrypted.toString(cryptojs.enc.Utf8));
    const token = cookie.token;

    if (token) {
        jwt.verify(token, process.env.COOKIE_KEY, (err, verifiedJwt) => {
            if (err) {
                console.log("err-jwtid", err);
                res.send(200).json('no token');
                next();
            } else {
                console.log("verifiedJwt.id", verifiedJwt.id);
                next();
            }
        });
    } else {
        console.log('No token');
    }
};