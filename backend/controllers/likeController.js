'use strict';

const { User, Post, Like } = require("../config/dbConfig");

/*  *********************************************************** */
//  enregistrer un nouveau like
/*  *********************************************************** */
exports.createLike = async(req, res) => {
    const likeObject = req.body;
    Like.findAll({
            where: { // chercher tous les likes pour un post et un user
                userId: req.body.userId,
                postId: req.body.postId
            }
        })
        .then(likes => {
            if (likes.length === 0) {
                const like = new Like({
                    ...likeObject
                });
                like.save()
                    .then(() => {
                        Like.findAll({ //chercher les likes par post
                            where: { postId: req.body.postId }
                        }).then(likes => {
                            res.status(200).json({ like: likes.length });
                        })
                    })
                    .catch(error => res.status(400).json({ error }));
            } else {
                Like.destroy({
                        where: {
                            userId: req.body.userId,
                            postId: req.body.postId
                        }
                    })
                    .then(() => {
                        Like.findAll({
                            where: { postId: req.body.postId }
                        }).then(likes => {
                            res.status(200).json({ like: likes.length });
                        })
                    })
                    .catch(error => res.status(400).json({ error }));
            }
        })
};

/*  ****************************************************** */
//  récupérer tous les likes
/*  ****************************************************** */
exports.getAllLikes = (req, res) => {
    Like.findAll({ where: { postId: req.params.postId } })
        .then(likes => {
            const message = 'La liste des likes a bien été récupérée !';
            res.status(200).json({ message, data: likes })
        }).catch(error => res.status(400).json({ error }));
};