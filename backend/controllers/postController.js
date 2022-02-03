'use strict';

const db = require('../models') // accès tables
const cryptojs = require('crypto-js')
const fs = require("fs");
const Cookies = require("cookies");

/*  *********************************************************** */
//  créer un nouveau post
/*  *********************************************************** */
exports.createPost = async(req, res) => {
    const cryptedCookie = new Cookies(req, res).get('snToken');
    const cookie = JSON.parse(cryptojs.AES.decrypt(cryptedCookie, process.env.COOKIE_KEY).toString(cryptojs.enc.Utf8))
    let postObject = req.file ? {
        ...req.body,
        attachmentUrl: req.file.filename,
    } : {
        ...req.body,
    };
    try {
        const post = await db.Post.create({...postObject,
                UserId: cookie.userId, //!!!!!!!! U uppercase
            })
            // le post est crée qu'il y est un req.file ou pas
        return res.status(201).json({
            post: post,
            message: "Le post a bien été crée !"
        })
    } catch (err) {
        return res.status(400).json({ message: "Echec de la création du post !" });
    }
}

/*  ****************************************************** */
//  récupérer tous les posts
/*  ****************************************************** */
exports.getAllPosts = async(req, res) => {
    try {
        const posts = await db.Post.findAll({
            attributes: ['id', 'content', 'attachmentUrl', 'title', 'createdAt'],
            order: [
                ['createdAt', 'DESC']
            ],
            include: [{
                    model: db.User,
                    attributes: ['firstName', 'familyName', 'id', 'photoUrl'],
                }, {
                    model: db.Like,
                    attributes: ['UserId'],
                },
                {
                    model: db.Comment,
                    attributes: ['message', 'id', 'UserId', 'createdAt'],
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    include: [{
                        model: db.User,
                        attributes: ['firstName', 'familyName', 'id', 'photoUrl'],
                    }]
                }
            ]
        });
        res.status(200).json(posts)
    } catch (err) {
        return res.status(500).json({ err: "Une erreur s'est produite!" })
    }
}

/*  ****************************************************** */
//  récupérer un post
/*  ****************************************************** */
exports.getOnePost = async(req, res) => {
    try {
        const post = await db.Post.findOne({
            // on récupère le post avec l'id fourni en incluant les tables et attributs nécessaires
            where: { id: req.params.id },
            include: [{
                model: db.User,
                attributes: ['firstName', 'familyName', 'id', 'photoUrl'],
            }, ],
        })
        res.status(200).json(post);
    } catch (err) {
        return res.status(500).json({ message: "Erreur serveur" })
    }
}

/*  ****************************************************** */
//  tous les posts d'un seul utilisateur
/*  ****************************************************** */

exports.getUserPosts = async(req, res) => {
    try {
        const post = await db.Post.findAll({
            where: { userId: req.params.id },
            include: [{
                model: db.User,
                attributes: ['firstName', 'familyName', 'id', 'photoUrl'],
            }, ],
        })
        res.status(200).json(post)
    } catch (err) {
        return res.status(500).json({ message: "Erreur serveur" })
    }
}

/*  ****************************************************** */
// modifier un post
/*  ****************************************************** */

exports.updatePost = async(req, res, ) => {
    let postObject = req.file ? {
        ...req.body,
        attachmentUrl: req.file.filename
    } : {
        ...req.body
    };

    try {
        const post = await db.Post.update({
            ...postObject,
            id: req.params.id
        }, {
            where: {
                id: req.params.id
            }
        });
        return res.status(200).json({ message: "Le post a été crée avec succès !" });
    } catch (err) {
        res.status(400).json({ message: "Echec de la mise à jour du post !" });
    }
};

/********************************************************/
// supprimer un post
/********************************************************/
exports.deletePost = async(req, res) => {
    try {
        const post = await db.Post.findByPk(req.params.id);

        if (!post) {
            res.status(401).json({ err: "post non trouvé !" });
        } else {
            await post.destroy();
            res.status(200).json({ message: "Post supprimé avec succès" })
        }
    } catch (err) {
        res.status(400).json({ err: "Echec de la suppression du post !" });
    }
}