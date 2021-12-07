'use strict';

const { User, Comment } = require("../config/dbConfig");
const { checkUser } = require('../middlewares/authUser');
const { retrieveFromToken } = require('../middlewares/authorize');
const bcrypt = require("bcrypt");
const Joi = require("joi"); //  valider le mot de passe côté client
const jwt = require("jsonwebtoken");
const extractToken = require("../middlewares/authorize.js");


/*  *********************************************************** */
//  créer un nouveau commentaire
/*  *********************************************************** */
exports.createComment = async(req, res) => {
    //     const commentObject = req.body;
    //     const comment = new Comment({...commentObject });

    //     try {
    //         const newComment = await comment.save()
    //             .then(() => {
    //                 Comment.findAll({
    //                         where: { postId: req.body.postId }
    //                     })
    //                     .then((comments) => {
    //                         res.status(200).json(comments);
    //                     });
    //             }).catch(error => res.status(400).json({ error }));
    //     } catch (err) {
    //         const message = `Failed to create the comment!`;
    //         res.status(400).json({ message, data: err });
    //     }
    // };

    // autre méthode :
    //recupérer l'autorisation
    // var headerAuth = req.headers['authorization'];
    // var userId = jwtUtils.getUserId(headerAuth);

    //Paramètres
    // const token = req.cookies('jwtCookie');
    // const {token} = req.cookies;
    // console.log(token);
    // const token = jwt.sign( //générer le token
    //{ userId: user.id },
    // process.env.SECRET_KEY, { expiresIn: "24h" }
    //);
    //retrieveFromToken(); // pour pouvoir utiliser le middleware authorize


    const content = req.body.message;
    const postId = req.params.postId;
    const userId = req.userId;

    if (content == null) {
        return res.status(400).json({ msg: 'content required!' });
    };
    User.findOne({
            attributes: ['id'],
            where: { id: userId }
        })
        .then(user => {
            if (user) {
                const newComment = Comment.create({
                        message: content,
                        userId: user.id,
                        postId
                    })
                    .then(newComment => {
                        return res.status(201).json({
                            message: "commentary added!"
                        });
                    })
                    .catch(err => {
                        return res.status(500).json({ message: 'impossible d\'ajouter le commentaires' + err })
                    });
            } else {
                return res.status(409).json({ message: 'Utilateur introuvable' });
            }
        })
        .catch(function(err) {
            return res.status(500).json({ message: 'impossible de vérifier l\'utilisateur' + err });
        });
};
/*  ****************************************************** */
//  récupérer tous les commentaires
/*  ****************************************************** */
exports.getAllComments = (req, res) => {
    Comment.findAll()
        .then(comments => {
            const message = `La liste des commentaires du post ${req.params.postId} a bien été récupérée !`;
            res.json({ message, data: comments })
        }).catch(error => console.log(error))
};

/*  ****************************************************** */
//  récupérer un commentaire
/*  ****************************************************** */
exports.getOneComment = (req, res) => {
    const id = req.params.commentId;
    Comment.findByPk(id)
        .then(comment => {
            const message = 'Un commentaire a bien été récupéré !';
            res.json({ message, data: comment })
        }).catch(error => console.log(error))
};

/*  ****************************************************** */
// supprimer un commentaire
/*  ****************************************************** */
exports.deleteComment = (req, res) => {
    const id = req.params.commentId;
    Comment.findByPk(id)
        .then(comment => {
            console.log(comment);
            Comment.destroy({ where: { id: comment.id } })
                .then(_ => {
                    const message = `Le commentaire ${ comment.id } a bien été supprimé!`;
                    res.json({ message, data: comment })
                })
        }).catch(error => console.log(error))
};