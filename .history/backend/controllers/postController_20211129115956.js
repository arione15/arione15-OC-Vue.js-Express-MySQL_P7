'use strict';

const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const Joi = require("joi"); //  valider le mot de passe côté client
const jwt = require("jsonwebtoken");
//const { Post } = require('sequelize');


/*  *********************************************************** */
//  I. Contrôleur pour l'enregistrement d'un nouveau post
/*  *********************************************************** */
// Create and Save a new post:

exports.createPost = (req, res) => {
    // Validate request
    if (!req.body.description) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a post
    const post = {
        description: req.body.description,
    };

    // Save post in the database
    Post.createPost(post)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the medium."
            });
        });
};