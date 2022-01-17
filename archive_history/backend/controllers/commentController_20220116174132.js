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
            return res.status(400).json({ message: 'content required!' });
        }
        const newComment = await db.Comment.create({
            message: message,
            UserId: cookie.userId,
            PostId: req.params.id,
            created
        });
        res.status(200).json({
            message: "commetary added"
        });
    } catch (err) {
        return res.status(500).json({ message: 'impossible de vérifier l\'utilisateur' + err });
    };
};
/*  ****************************************************** */
//  récupérer tous les commentaires
/*  ****************************************************** */
// exports.getAllComments = (req, res) => {
//     Comment.findAll()
//         .then(comments => {
//             const message = `La liste des commentaires du post ${req.params.postId} a bien été récupérée !`;
//             res.json({ message, data: comments })
//         }).catch(error => console.log(error))
// };

/*  ****************************************************** */
//  récupérer un commentaire
/*  ****************************************************** */
// exports.getOneComment = (req, res) => {
//     const id = req.params.commentId;
//     Comment.findByPk(id)
//         .then(comment => {
//             const message = 'Un commentaire a bien été récupéré !';
//             res.json({ message, data: comment })
//         }).catch(error => console.log(error))
// };

/*  ****************************************************** */
// supprimer un commentaire
/*  ****************************************************** */
exports.deleteComment = async(req, res) => {
    const cryptedCookie = new Cookies(req, res).get('snToken');
    const cookie = JSON.parse(cryptojs.AES.decrypt(cryptedCookie, process.env.COOKIE_KEY).toString(cryptojs.enc.Utf8))
    const id = req.params.commentId;
    const user = await db.User.findOne({
        where: { id: cookie.userId }
    });
    const comment = await db.Comment.findOne({
        where: { id: req.params.commentId }
    });

    if (user.role === 1 || cookie.userId == comment.UserId) {
        await db.Comment.destroy({ where: { id: req.params.commentId } });
        const message = `Commentary deleted`;
        res.json({ message })
    } else {
        const message = `Commentary could not be removed`;
        res.json({ message })
    }
}