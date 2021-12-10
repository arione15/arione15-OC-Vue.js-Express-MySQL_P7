'use strict';

const { User, Post, Like, Comment } = require('../config/dbConfig');
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);


// const bcrypt = require("bcrypt");
// const Joi = require("joi"); //  valider le mot de passe côté client
// const jwt = require("jsonwebtoken");
// const auth = require('../middlewares/authorize');
// const multer = require('../middlewares/multer-config');

/*  *********************************************************** */
//  créer un nouveau post
/*  *********************************************************** */
exports.createPost = async(req, res) => {
    let fileName = req.body.userId + Date.now() + ".jpg";;
    let postObject = req.file ? {...req.body,
        attachmentUrl: `${req.protocol}://${req.get("host")}/images/profil/${ fileName }`
    } : {...req.body };
    const post = new Post({...postObject });

    if (req.file !== null) {
        try {
            if (
                req.file.detectedMimeType != "image/jpg" &&
                req.file.detectedMimeType != "image/png" &&
                req.file.detectedMimeType != "image/jpeg"
            )
                throw Error("invalid file");

            if (req.file.size > 500000) throw Error("max size");
        } catch (err) {
            return res.status(201).json({ err });
        }

        await pipeline(req.file.stream, fs.createWriteStream(`${__dirname}/../media/posts/${fileName}`));

        try {
            post.save().then((x) => {
                const message = `The post has been successfully created!`;
                return res.status(201).json({ message, data: x });
            });
        } catch (err) {
            const message = `Failed to create the post!`;
            res.status(400).json({ message, data: err });
        }
    };
}

/*  ****************************************************** */
//  récupérer tous les posts
/*  ****************************************************** */
exports.getAllPosts = (req, res) => {
    Post.findAll()
        .then(posts => {
            const message = 'The list of all the posts has been successfully retrieved!';
            res.json({ message, data: posts })
        }).catch(error => console.log("Error getting all the posts", error))
}

/*  ****************************************************** */
//  récupérer un post
/*  ****************************************************** */
exports.getOnePost = (req, res) => {
    Post.findByPk(req.params.id)
        .then(post => {
            const message = 'A post has been successfully retrieved!';
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
        return res.status(400).json({ 'error': "Please enter modification to 'Contenu' field!" });
    }

    Post.update({...postObject, id: req.params.id }, { where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Post modified!' }))
        .catch(error => res.status(400).json({
            message: "update failed",
            data: error
        }));
};

/********************************************************/
// supprimer un post
/********************************************************/
exports.deletePost = async(req, res) => {
    let myUuid = req.params.id;
    const myId = await Post.findOne({
        where: { id: myUuid }
    });

    if (myId === null) {
        return res.status(401).json({
            message: "id not found !"
        });
    } else {
        console.log(myId instanceof Post); // true
        Post.destroy({ where: { id: myUuid } })
            .then(() => res.status(200).json({ message: 'post deleted!' }))
            .catch(error => res.status(400).json({ message: 'delete failed!', error }));
    }
}