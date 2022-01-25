'use strict';

const db = require('../models') // accès tables
const cryptojs = require('crypto-js')
const fs = require("fs");
const Cookies = require("cookies");

/*  *********************************************************** */
//  créer un nouveau post
/*  *********************************************************** */
exports.createPost = async(req, res) => {
    // let fileName = req.body.userId + Date.now() + ".jpg";
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
        return res.status(201).json(post);
    } catch (error) {
        return res.status(400).json({
            error: 'Failed to create the post!'
        });
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
                model: db.Comment,
                attributes: ['message', 'id', 'UserId', 'createdAt'],
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [{
                    model: db.User,
                    attributes: ['firstName', 'familyName', 'id', 'photoUrl'],
                }]
            }, {
                model: db.Like,
                attributes: ['UserId'],
            }]
        });
        res.status(200).send(posts)
    } catch (error) {
        return res.status(500).send({ error: "Une erreur s'est produite!" })
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
        res.status(200).json(post)
    } catch (error) {
        return res.status(500).send({ error: 'Erreur serveur' })
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
    } catch (error) {
        return res.status(500).send({ error: 'Server Error' })
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
    //const content = req.body.content;
    try {
        // if (content === null || content === '') {
        //     return res.status(400).json({
        //         'error': "Please enter modification to 'Contenu' field!"
        //     });
        // }
        const post = await db.Post.update({
            ...postObject,
            id: req.params.id
        }, {
            where: {
                id: req.params.id
            }
        });
        return res.status(200).send({
            message: 'The post has been successfully modified!'
        });
    } catch (error) {
        res.status(400).send({
            error: 'Update failed'
        });
    }
};

/********************************************************/
// supprimer un post
/********************************************************/
exports.deletePost = async(req, res) => {
    try {
        const post = await db.Post.findByPk(req.params.id);
        console.log(post);
        if (!post) {
            res.status(401).json({
                message: "post non trouvé !"
            });
        } else {
            await post.destroy();
            res.status(200).json({ message: "Suppression du post ok" })
        }
    } catch (error) {
        res.status(400).send({
            error: 'Echec de la suppression du post !'
        });
    }
}