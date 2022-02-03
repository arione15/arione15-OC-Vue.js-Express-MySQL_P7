const cryptojs = require('crypto-js')
const Cookies = require('cookies');
const db = require('../models') // accès tables

exports.authPage = (req, res, next) => {
    // on récupère le id qui est stocké dans le cookie
    const cryptedCookie = new Cookies(req, res).get('snToken');
    const cookie = JSON.parse(cryptojs.AES.decrypt(cryptedCookie, process.env.COOKIE_KEY).toString(cryptojs.enc.Utf8));
    const id = cookie.userId;
    console.log("userIdMidleware", id);

    db.User.findByPk(id)
        .then(user => {
            console.log("userMidleware", user.role);
            if (user.role == 1) {
                next();
            } else {
                res.status(401).json({ message: "Désolé, vous n'êtes pas autorisés à accèder à cette page !" });
            }
        }).catch(() => res.status(400).json({ message: "Echec de la récupération de l\'utilsateur !" }))
}