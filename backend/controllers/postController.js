'use strict';

const { User, Post } = require('../config/dbConfig');
// const bcrypt = require("bcrypt");
// const Joi = require("joi"); //  valider le mot de passe côté client
// const jwt = require("jsonwebtoken");
// const auth = require('../middlewares/authorize');
// const multer = require('../middlewares/multer-config');

/*  *********************************************************** */
//  créer un nouveau post
/*  *********************************************************** */
exports.createPost = async(req, res) => {

    const postObject = req.body;
    const post = new Post({...postObject });
    // const post = new Post({
    //     ...postObject,
    //     image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    // });
    // ou 
    //const postObject = {
    //...req.body,
    //image_url: req.file ? req.file.location : null
    //};

    try {
        const newPost = await post.save().then((x) => {
            const message = `Le post a été créé avec succès !`;
            return res.status(201).json({ message, data: x });
        });
    } catch (err) {
        const message = `Le post n'a pas pu être créé !`;
        res.status(400).json({ message, data: err });
    }
};

// autre méthode :
// Post.create(req.body)
//     .then(post => {
//         const message = `Le post ${req.body.title} a bien été créé !`;
//         res.json({ message, data: post })
//     }).catch(error => console.log(error))
// };

/*  ****************************************************** */
//  récupérer tous les posts
/*  ****************************************************** */
exports.getAllPosts = (req, res) => {
    Post.findAll()
        .then(posts => {
            const message = 'La liste des postes a bien été récupérée !';
            res.json({ message, data: posts })
        }).catch(error => console.log("Error getting all the posts", error))
}

/*  ****************************************************** */
//  récupérer un post
/*  ****************************************************** */
exports.getOnePost = (req, res) => {
    Post.findByPk(req.params.id)
        .then(post => {
            const message = 'Un post a bien été récupérée !';
            res.json({ message, data: post })
        }).catch(error => console.log("Error getting the post", error))
}

/*  ****************************************************** */
// modifier un post
/*  ****************************************************** */

exports.updatePost = (req, res, ) => {
    const postObject = req.body;
    const content = req.body.content;

    if (content === null || content === '') {
        return res.status(400).json({ 'error': "Veuillez modifier le champ 'Contenu' !" });
    }

    Post.update({...postObject, id: req.params.id }, { where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Post modifié !' }))
        .catch(error => res.status(400).json({
            message: "update failed",
            data: error
        }));
};

/*  ****************************************************** */
// supprimer un post
/*  ****************************************************** */
exports.deletePost = (req, res) => {
    // Like.destroy({ where: { articleId: req.params.id } })
    //     .then(() =>
    //         Comment.destroy({ where: { articleId: req.params.id } })
    //         .then(() =>
    Post.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Post supprimé !' }))
        // )
        // )
        .catch(error => res.status(400).json({
            message: "update failed",
            data: error
        }));
};