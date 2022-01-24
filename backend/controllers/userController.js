'use strict';
const db = require('../models')
const sequelize = require('sequelize')
const cryptojs = require('crypto-js')
const cookies = require('cookies')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const fs = require('fs');

/*  *********************************************************** */
//  enregistrer un nouvel utilisateur
/*  *********************************************************** */
// 1- valider les inputs de l'email et du mdp, 2- crypter le mdp, 3- créer nouvel user, 4- l'enregistrer dans la BDD
exports.signup = async(req, res) => {
        const { firstName, familyName, email, password, role } = req.body;
        console.log("image", req.file);
        try {
            const user = await db.User.findOne({
                    where: { email: req.body.email },
                }) // si l'email est utilisé existe
            if (user) {
                fs.unlinkSync(req.file.path);
                return res.status(409).send('This email already exists!');
            } else {
                const allUsers = await db.User.findAll({
                    attributes: {
                        include: [
                            [sequelize.fn('COUNT', sequelize.col('id')), 'totalUsers']
                        ],
                    },
                })
                const numUsers = allUsers[0].dataValues.totalUsers //
                let isAdmin = false
                    //si on n'a aucun utilisateur dans la BDD, le 1er utilisateur créé
                    //sera admin
                if (numUsers === 0) isAdmin = true
                const hashPass = await bcrypt.hash(password, 10);
                const userObject = {
                    firstName: firstName,
                    familyName: familyName,
                    email: email,
                    password: hashPass,
                    role: isAdmin,
                    photoUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null,
                };

                const createdUser = await db.User.create(userObject);
                res.status(200).send({ message: 'The user is successfully connected!', data: createdUser });
            }
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
        const user = await db.User.findOne({ where: { email: req.body.email } });

        if (!user) {
            return res.status(403).send('The login information (email) is incorrect!');
        } else {
            // on compare les mots de passes
            const hash = await bcrypt.compare(req.body.password, user.password)
            if (!hash) {
                return res.status(401).send({ error: 'Mot de passe incorrect !' })
            } else {
                //on créé un token
                const newToken = jwt.sign({ userId: user.id }, process.env.COOKIE_KEY, {
                        expiresIn: '24h',
                    })
                    //on créé un cookie
                const cookieContent = {
                        token: newToken,
                        userId: user.id,
                    }
                    //cryptage du cookie
                const cryptedCookie = cryptojs.AES.encrypt(
                    JSON.stringify(cookieContent),
                    process.env.COOKIE_KEY,
                ).toString()
                new cookies(req, res).set('snToken', cryptedCookie, {
                    httpOnly: true,
                    maxAge: 86400000, // 24h
                });
                // on renvoie le user et le cookie
                res.status(200).send({
                    user: user,
                    cryptedCookie,
                })
            }
        }
    } catch (error) {
        res.send({ error: 'An error has occured while trying to log in!' });
    }
}


/*  ****************************************************** */
//  gérer la déconnexion d'un utilisateur
/*  ****************************************************** */
exports.logout = (req, res) => {
    res.cookie('snToken', '', {
        maxAge: 1 // suppression instantannée (1 ms)
    });
    res.status(200).json({
        message: "utilisateur déconnecté",
        redirect: '/home'
    });
};

/*  ****************************************************** */
//  récupérer tous les utilisateurs
/*  ****************************************************** */
exports.getAllUsers = async(req, res) => {
    try {
        const users = await db.User.findAll({
            attributes: ['id', 'firstName', 'familyName', 'email', 'photoUrl', 'role'],
        })
        return res.status(200).send(users)
    } catch (error) {
        return res.status(500).send({ error: 'Erreur serveur' })
    }
};

/*  ****************************************************** */
//  récupérer un utilisateur
/*  ****************************************************** */
exports.getOneUser = (req, res) => {
    const id = req.params.id;
    db.User.findByPk(id)
        .then(user => {
            const message = 'Un utilisateur a bien été récupéré !';
            res.json({ message, data: user })
        }).catch(error => res.send(error))
};

/*  ****************************************************** */
// modifier un utilisateur
/*  ****************************************************** */
exports.updateUser = async(req, res) => {
    let userObject = req.file ? {
        ...req.body,
        photoUrl: `${req.protocol}://${req.get("host")}/images/${ req.file.filename }`
    } : {
        ...req.body
    };
    //const content = req.body.content;
    try {
        const user = await db.User.update({
            ...userObject,
            id: req.params.id
        }, {
            where: {
                id: req.params.id
            }
        });
        return res.status(200).send({
            message: 'The user has been successfully modified!',
            data: user
        });
    } catch (error) {
        res.status(400).send({
            error: 'Update failed'
        });
    }
}

/*  ****************************************************** */
// modifier le mot de passe
/*  ****************************************************** */
exports.updatePwd = async(req, res) => {
    const id = req.params.id
    const hashedPwd = await bcrypt.hash(req.body.password, 10)
    const newUser = {
        password: hashedPwd
    }
    db.User.findByPk(id).then((user) => {
        user
            .update(newUser, { where: { id: id } })
            .then((user = res.send(user)))
            .catch(error => res.send(error))
    })
}


/*  ****************************************************** */
// supprimer un utilisateur
/*  ****************************************************** */
exports.deleteUser = (req, res) => {
    db.User.findByPk(req.params.id)
        .then(user => {
            const userDeleted = user;
            db.User.destroy({ where: { id: user.id } })
                .then(_ => {
                    const message = `L'utilisateur ayant l'identifiant ${userDeleted.id} a bien été supprimé !`;
                    res.json({ message, data: userDeleted })
                })
        }).catch(error => res.send(error))
};