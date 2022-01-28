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
        try {
            const user = await db.User.findOne({
                where: { email: req.body.email },
            });

            if (user) {
                fs.unlinkSync(req.file.path);
                return res.status(409).send({
                    message: "Cet email existe déja !"
                });
            } else {
                const allUsers = await db.User.findAll({
                    attributes: {
                        include: [
                            [sequelize.fn('COUNT', sequelize.col('id')), 'totalUsers']
                        ],
                    },
                })
                const numUsers = allUsers[0].dataValues.totalUsers
                let isAdmin = false;

                if (numUsers === 0) isAdmin = true;
                const hashPass = await bcrypt.hash(password, 10);
                const userObject = {
                    firstName: firstName,
                    familyName: familyName,
                    email: email,
                    password: hashPass,
                    role: isAdmin,
                    photoUrl: req.file ? req.file.filename : null,
                };
                const createdUser = await db.User.create(userObject);
                return res.status(200).send({
                    message: "L'utilisateur a été crée avec succès !"
                });
            }
        } catch (error) {
            return res.status(400).send({
                message: "Une erreur est apparu lors de l'inscription !"
            });
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
            return res.status(403).json({ message: "Les informations de login (email) sont incorrectes !" });
        } else {
            // on compare les mots de passes
            const hash = await bcrypt.compare(req.body.password, user.password)
            if (!hash) {
                return res.status(401).json({ message: 'Mot de passe incorrect !' })
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
                res.status(200).json({
                    user: user,
                    cryptedCookie,
                })
            }
        }
    } catch (err) {
        res.status(500).json({ message: "Une erreru est apparue lors de login!" });
    }
}

/*  ****************************************************** */
//  gérer la déconnexion d'un utilisateur
/*  ****************************************************** */
exports.logout = (req, res) => {
    res.cookie('snToken', '', {
        maxAge: 1 // suppression instantannée (1 ms)
    });
    res.status(200).json({ message: "utilisateur déconnecté" });
};

/*  ****************************************************** */
//  récupérer tous les utilisateurs
/*  ****************************************************** */
exports.getAllUsers = async(req, res) => {
    try {
        const users = await db.User.findAll({
            attributes: ['id', 'firstName', 'familyName', 'email', 'photoUrl', 'role'],
        })
        return res.status(200).json(users)
    } catch (err) {
        return res.status(500).json({ err: "Erreur serveur" })
    }
};

/*  ****************************************************** */
//  récupérer un utilisateur
/*  ****************************************************** */
exports.getOneUser = (req, res) => {
    const id = req.params.id;
    db.User.findByPk(id)
        .then(user => {
            res.status(200).json({ message: "Un utilisateur a bien été récupéré !", data: user })
        }).catch(() => res.status(400).json({ message: "Echec de la récupération de l\'utilsateur !" }))
};

/*  ****************************************************** */
// modifier un utilisateur
/*  ****************************************************** */
exports.updateUser = async(req, res) => {
    let userObject = req.file ? {
        ...req.body,
        photoUrl: req.file.filename
    } : {
        ...req.body
    };
    try {
        const user = await db.User.update({
            ...userObject,
            id: req.params.id
        }, {
            where: {
                id: req.params.id
            }
        });
        return res.status(200).json({
            message: "Utilisateur modifié avec succès !",
            data: user
        });
    } catch (err) {
        res.status(400).json({ message: "Echec de la mise à jour" });
    }
}

/*  ****************************************************** */
// modifier le mot de passe
/*  ****************************************************** */
exports.updatePwd = async(req, res) => {
    const id = req.params.id;
    const hashedPwd = await bcrypt.hash(req.body.password, 10);
    const newUser = { password: hashedPwd };
    db.User.findByPk(id).then((user) => {
        user
            .update(newUser, { where: { id: id } })
            .then((user = res.json(user)))
            .catch(() => res.status(401).json({ message: "Echec de la modification du mot de passe !" }))
    }).catch(() => res.status(400).json({ message: "User non trouvé !" }))
}

/*  ****************************************************** */
// supprimer un utilisateur
/*  ****************************************************** */
exports.deleteUser = async(req, res) => {
    try {
        const user = await db.User.findByPk(req.params.id);

        if (user.role == 0) {
            await user.destroy();
            res.status(200).json({ message: "L'utilisateur a bien été supprimé !" })
        } else {
            res.status(400).json({ message: "Ne pas supprimer le dernier Admin !" })
        }
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur !" })
    }
}