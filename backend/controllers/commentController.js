'use strict';

const db = require('../models') // accès tables
const Cookies = require("cookies");
const cryptojs = require('crypto-js')

/*  *********************************************************** */
//  créer un nouveau commentaire
/*  *********************************************************** */
exports.createComment = async(req, res) => {
    const cryptedCookie = new Cookies(req, res).get('snToken');
    const cookie = JSON.parse(cryptojs.AES.decrypt(cryptedCookie, process.env.COOKIE_KEY).toString(cryptojs.enc.Utf8))
    const message = req.body.message;

    try {

        if (message == null) {
            return res.status(400).json({ message: 'Contenu requis !' });
        }
        await db.Comment.create({
            message: message,
            UserId: cookie.userId,
            PostId: req.params.id,
        });
        res.status(200).json({ message: "Commentaire ajouté !" });
    } catch (err) {
        return res.status(500).json({ err: 'Impossible de vérifier l\'utilisateur' });
    };
};

/*  ****************************************************** */
// supprimer un commentaire
/*  ****************************************************** */
exports.deleteComment = async(req, res) => {
    const cryptedCookie = new Cookies(req, res).get('snToken');
    const cookie = JSON.parse(cryptojs.AES.decrypt(cryptedCookie, process.env.COOKIE_KEY).toString(cryptojs.enc.Utf8))
    await db.User.findOne({ where: { id: cookie.userId } });
    await db.Comment.findOne({ where: { id: req.params.commentId } });
    await db.Comment.destroy({ where: { id: req.params.commentId } });
    res.status(200).json({ message: "Commentaire supprimé !" });
}