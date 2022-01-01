'use strict';

//const { User } = require("../config/dbConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const Post = require("../models/Post");
//const User = require("../models/User");
const db = require("../config/db");
const User = db.User;
const Post = db.Post;
const fs = require('fs');

/*  *********************************************************** */
//  enregistrer un nouvel utilisateur
/*  *********************************************************** */
// 1- valider les inputs de l'email et du mdp, 2- crypter le mdp, 3- créer nouvel user, 4- l'enregistrer dans la BDD
exports.signup = async(req, res) => {
        const { firstName, familyName, email, password, role } = req.body;
        // let userObject = req.file ? {
        //     ...req.body,
        //     photoUrl: `${req.protocol}://${req.get("host")}/images/${ req.file.filename }`
        // } : {
        //     ...req.body
        // };
        console.log("image", req.file);
        try {

            // if (firstName === null || firstName === '' || familyName === null || familyName === '' ||
            //     email === null || email === '' || password === null || password === '' || role === null || role === '') {
            //     return res.status(400).send({ error: 'Please fill in the fields!' });
            // };
            const user = await User.findOne({ attributes: ['email'], where: { email: email } });

            //console.log(user);
            if (user) {

                return res.status(409).send({ error: 'This email belongs to an exiting user' });
            } else {
                console.log("1211");
                bcrypt
                    .hash(password, 10)
                    .then(hashPass => {
                        const userObject = {
                            firstName: firstName,
                            familyName: familyName,
                            email: email,
                            password: hashPass,
                            role: role,
                            photoUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`  : null,
                        };
                        console.log("photo", userObject.photoUrl);
                        User.create(userObject)
                            .then(createdUser => {
                                res.status(201).send(createdUser);
                            })
                            .catch(error => {
                                res.status(500).json({ error });
                            })
                    })
                    .catch(error => res.status(500).json({ error }));
            };
        } catch (error) {
            return res.status(500).send({ error: 'An error has occured while trying to sign up!' });
        }
    }
    /*  ****************************************************** */
    //  gérer la connexion d'un utilisateur
    /*  ****************************************************** */
    // 1- vérifier si l'utilisateur est enregistré, 2- envoyer un token avec un payload (ici le userId)
exports.login = async(req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(403).send({ error: 'The login information (email) is incorrect!' });
        }
        bcrypt
            .compare(req.body.password, user.password)
            .then((isPasswordValid) => {
                if (!isPasswordValid) {
                    return res.status(403).send({ error: 'The login information (pwd) is incorrect!' });
                } else {
                    // si la comparaison est valide, on répond par l'envoi du token (avec le userId qui va avec) et on l'envoie dans un cookie.
                    const token = jwt.sign( //générer le token
                        { userId: user.id },
                        process.env.SECRET_KEY, { expiresIn: "24h" }
                    );
                    res.cookie('jwtCookie', token, { //mettre le token dans un cookie
                        httpOnly: true,
                        maxAge: parseInt(process.env.MAX_AGE)
                    });
                    res.status(200).send({ message: 'The user is successfully connected!', data: user, token }); // retourner le token au client
                }
            });
    } catch (error) {
        res.send({ error: 'An error has occured while trying to log in!' });
    }
}


/*  ****************************************************** */
//  gérer la déconnexion d'un utilisateur
/*  ****************************************************** */
exports.logout = (req, res) => {
    res.cookie('jwtCookie', '', {
        maxAge: 1 // suppression instantannée (1 milliseconde)
    });
    res.status(200).json({
        message: "utilisateur déconnecté",
        redirect: '/'
    });
};

/*  ****************************************************** */
//  récupérer tous les utilisateurs
/*  ****************************************************** */
exports.getAllUsers = (req, res) => {
    User.findAll({ include: [Post] })
        .then(users => {
            const message = 'La liste des utilisateurs a bien été récupérée !';
            res.json({ message, data: users })
        }).catch({ error: "error" })
};

/*  ****************************************************** */
//  récupérer un utilisateur
/*  ****************************************************** */
exports.getOneUser = (req, res) => {
    const id = req.params.id;
    User.findByPk(id)
        .then(user => {
            const message = 'Un utilisateur a bien été récupéré !';
            res.json({ message, data: user })
        }).catch(error => console.log(error))
};

/*  ****************************************************** */
// modifier un utilisateur
/*  ****************************************************** */
exports.updateUser = (req, res) => {
    const id = req.params.id;
    User.update(req.body, { where: { id: id } })
        .then(_ => {
            User.findByPk(id).then(user => {
                const message = `L'utilisateur ${user.name} a bien été modifié !`;
                res.json({ message, data: req.body })
            })
        }).catch(error => console.log(error))
};

/*  ****************************************************** */
// supprimer un utilisateur
/*  ****************************************************** */
exports.deleteUser = (req, res) => {
    User.findByPk(req.params.id)
        .then(user => {
            const userDeleted = user;
            User.destroy({ where: { id: user.id } })
                .then(_ => {
                    const message = `L'utilisateur ayant l'identifiant ${userDeleted.id} a bien été supprimé !`;
                    res.json({ message, data: userDeleted })
                })
        }).catch(error => console.log(error))
};