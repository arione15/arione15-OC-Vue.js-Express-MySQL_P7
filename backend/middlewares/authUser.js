const jwt = require('jsonwebtoken');
const db = require("../config/db");
const cryptojs = require("crypto-js");

const User = db.User;

// identifier le user et vérifier son token
exports.checkUser = async(req, res, next) => {
    //const cryptedToken = new Cookies(req, res).get('snToken');
    const cryptedToken = req.cookies.snToken;
    console.log("cryptedToken01", cryptedToken);
    const tokenDecrypted = cryptojs.AES.decrypt(cryptedToken, process.env.COOKIE_KEY);
    console.log("tokenDecrypted", tokenDecrypted);
    const cookie = JSON.parse(tokenDecrypted.toString(cryptojs.enc.Utf8));
    console.log("cookie", cookie);
    console.log("token01", cookie.token);
    const token = cookie.token;

    if (token) {
        jwt.verify(token, process.env.COOKIE_KEY, async(err, verifiedJwt) => {

            if (err) { // si c'est pas le bon token
                console.log("err inside jwt verify", err);
                console.log("res.locals", res.locals);
                res.locals.user = null;
                res.cookie("snToken", "", { maxAge: 1 });
                next();
            } else {
                console.log("verifiedJwt", verifiedJwt);
                //const user = await User.findOne({ where: { id: verifiedJwt.userId } })
                const user = await User.findByPk(verifiedJwt.userId);
                console.log("user", user);
                console.log("res.locals", res.locals);
                console.log("verifiedJwt.userId", verifiedJwt.userId);
                res.locals.user = user;
                console.log("res.locals.user-ok", res.locals.user);
                next();
            }
        });
    } else { //si pas de token
        res.status(401).json({ error: 'Requête non authentifiée' });
        res.locals.user = null;
        next();
    }
};

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