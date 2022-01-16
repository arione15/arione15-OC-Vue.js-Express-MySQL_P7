'use strict';

const db = require('../models') // accès tables
const Cookies = require("cookies");
const cryptojs = require('crypto-js')
const { User, Post, Like } = require("../config/dbConfig");

/*  *********************************************************** */
//  créer un nouveau like
/*  *********************************************************** */
exports.createLike = async(req, res) => {
    const cryptedCookie = new Cookies(req, res).get('snToken');
    const cookie = JSON.parse(cryptojs.AES.decrypt(cryptedCookie, process.env.COOKIE_KEY).toString(cryptojs.enc.Utf8))

    const user = await db.Like.findOne({ //chercher le post liké par un user 
        where: { UserId: cookie.userId, PostId: req.params.id }
    });
    if (user) {
        await db.Like.destroy({ where: { UserId: cookie.userId, PostId: req.params.id } });
        res.status(200).send("user dislike the post")
    } else {
        await db.Like.create({ UserId: cookie.userId, PostId: req.params.id });
        res.status(200).send("user like the post");
    }
};
// /*  ****************************************************** */
// //  récupérer tous les likes
// /*  ****************************************************** */
// exports.getAllLikes = (req, res) => {
//     Like.findAll({ where: { postId: req.params.postId } })
//         .then(likes => {
//             const message = 'La liste des likes a bien été récupérée !';
//             res.status(200).json({ message, data: likes });
//         }).catch(error => res.status(400).json({ error }));
// };