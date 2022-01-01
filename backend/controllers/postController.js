'use strict';

const {
    User,
    Post,
    Like,
    Comment
} = require('../config/dbConfig');
const fs = require("fs");
// const {
//     promisify
// } = require("util");
// const pipeline = promisify(require("stream").pipeline);


// const bcrypt = require("bcrypt");
// const Joi = require("joi"); //  valider le mot de passe côté client
// const jwt = require("jsonwebtoken");
// const auth = require('../middlewares/authorize');
// const multer = require('../middlewares/multer-config');

/*  *********************************************************** */
//  créer un nouveau post
/*  *********************************************************** */
exports.createPost = async(req, res) => {
    // let fileName = req.body.userId + Date.now() + ".jpg";
    let postObject = req.file ? {
        ...req.body,
        attachmentUrl: `${req.protocol}://${req.get("host")}/images/${ req.file.filename }`
    } : {
        ...req.body
    };
    console.log(req.file);
    try {
        const post = await Post.create(postObject); // le post est crée qu'il y est un req.file ou pas
        // post.save().then(_ => {
        //     res.status(200).send({
        //         message: 'The post has been successfully created!',
        //         data: post
        //     })
        // })
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
exports.getAllPosts = async(req, response) => {
    try {
        const posts = await Post.findAll().then(posts => {
                return response.status(200).send({
                    message: 'The list of all the posts has been successfully retrieved!',
                    data: posts
                });
            })
            // .sort({
            //     createdAt: -1
    } catch (error) {
        response.status(400).send({
            error: 'Error getting all the posts'
        });
    }
}

/*  ****************************************************** */
//  récupérer un post
/*  ****************************************************** */
exports.getOnePost = async(req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        return res.status(200).send({
            message: 'The post has been successfully retrieved!',
            data: post
        });
    } catch (error) {
        res.status(400).send({
            error: 'Error getting the post'
        });
    }
}

/*  ****************************************************** */
// modifier un post
/*  ****************************************************** */

exports.updatePost = async(req, res, ) => {
    let postObject = req.file ? {
        ...req.body,
        attachmentUrl: `${req.protocol}://${req.get("host")}/images/${ req.file.filename }`
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
        const post = await Post.update({
            ...postObject,
            id: req.params.id
        }, {
            where: {
                id: req.params.id
            }
        });
        return res.status(200).send({
            message: 'The post has been successfully modified!',
            data: post
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
    let myUuid = req.params.id;
    const myId = await Post.findOne({
        where: {
            id: myUuid
        }
    });

    if (myId === null) {
        return res.status(401).json({
            message: "id not found !"
        });
    } else {
        console.log(myId instanceof Post); // true
        Post.destroy({
                where: {
                    id: myUuid
                }
            })
            .then(() => res.status(200).json({
                message: 'post deleted!'
            }))
            .catch(error => res.status(400).json({
                message: 'delete failed!',
                error
            }));
    }
    //.catch(error => res.status(400).json({ message: 'delete failed!', error }));
}

//.catch(error => res.status(400).json({ message: 'delete failed!', error }));