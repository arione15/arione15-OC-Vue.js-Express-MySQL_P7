'use strict';

const { User, Post } = require('../config/dbConfig');
const bcrypt = require("bcrypt");
const Joi = require("joi"); //  valider le mot de passe côté client
const jwt = require("jsonwebtoken");
const auth = require('../middlewares/authorize');
const multer = require('../middlewares/multer-config');

/*  *********************************************************** */
//  créer un nouveau post
/*  *********************************************************** */
exports.createPost = async(req, res) => {
    const postObject = req.body.post;
    const post = new Post({...postObject });
    // const post = new Post({
    //     ...postObject,
    //     image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    // });
    // posterId: req.body.posterId,
    //     title: req.body.title,
    //     content: req.body.content,
    //     likers: [],
    //     dislikers: [],
    //     likes: req.body.likes,
    //     dislikes: req.body.dislikes,
    //     createdAt: req.body.createdAt
    // });
    try {
        const newPost = await post.save().then(() => {
            const message = `Le post a été créé avec succès !`;
            res.status(201).json({ message, data: post });
        });
    } catch (err) {
        const message = `Le post n'a pas pu être créé !`;
        res.status(400).json({ message, data: err });
    }
};

/*  ****************************************************** */
//  récupérer tous les posts
/*  ****************************************************** */
exports.getAllPosts = (req, res) => {

}


/*  ****************************************************** */
//  récupérer un post
/*  ****************************************************** */
exports.getOnePost = (req, res) => {
    Post.findByPk(req.params.id)
        .then(post => {
            const message = 'Un post a bien été récupérée !';
            res.json({ message, data: post })
        }).catch(error => console.log("Error getting a post", error))
}

/*  ****************************************************** */
// modifier un utilisateur
/*  ****************************************************** */

exports.updatePost = (req, res) => {

}

/*  ****************************************************** */
// supprimer un utilisateur
/*  ****************************************************** */
exports.deletePost = (req, res) => {

}