const User = require("../models/User");
const bcrypt = require("bcrypt");
const Joi = require("joi"); //  valider le mot de passe côté client
const jwt = require("jsonwebtoken");

/*  *********************************************************** */
//  I. Contrôleur pour l'enregistrement d'un nouvel utilisateur
/*  *********************************************************** */
// 1- valider les input de l'email et du mdp, 2- crypter le mdp, 3- créer nouvel user, 4- l'enregistrer dans la BDD
exports.signup = (req, res, next) => {
    const schema = Joi.object().keys({
        name: Joi.string().min(2).max(30).required(),
        firstname: Joi.string().min(2).max(30).required(),
        email: Joi.string().min(7).required().email(),
        password: Joi.string().min(8).required().max(30).regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        ), // doit contenir 8 caractères minimum avec au moins une majuscule, une minuscule, un chiffre et un caractère spécial
        repeat_password: Joi.ref('password')
    });
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error);
    } else {
        bcrypt
            .hash(req.body.password, 10) // c'est une Promise dont la résolution est le hash généré
            .then((hash) => {
                const user = new User({
                    name: req.body.name,
                    firstname: req.body.firstname,
                    email: req.body.email,
                    password: hash,
                });
                user
                    .save()
                    .then(() =>
                        res.status(201).json({
                            message: "Utilisateur créé !",
                        })
                    )
                    .catch((error) =>
                        res.status(400).json({
                            error,
                        })
                    );
            })
            .catch((error) =>
                res.status(500).json({
                    error,
                })
            );
    }
};

/*  ****************************************************** */
//  I. Contrôleur pour gérer la connexion d'un utilisateur
/*  ****************************************************** */
// 1- vérifier si l'utilisateur est enregistré, 2- envoyer un token avec un payload (ici le userId)
exports.login = (req, res, next) => {
    User.findOne({
            email: req.body.email, //trouver un user dans la BDD dont l'email correspond à ce qui été envoyé dans le body de la requête
        })
        .then((user) => {
            // la résolution de la promesse envoie un user
            if (!user) { // si pas de correspondance ... 
                return res.status(401).json({
                    error: "Utilisateur non trouvé !",
                });
            } // si on a trouvé un user avec le bon email alors on compare les hash des mdp :
            bcrypt
                .compare(req.body.password, user.password)
                .then((boolValid) => {
                    // la résolution de la promesse envoie un booléen
                    if (!boolValid) {
                        return res.status(401).json({ // 401 : unauthorized
                            error: "Mot de passe incorrect !",
                        });
                    } // si la comparaison est valide, on répond par l'envoi du token (avec le userId qui va avec) et la création d'un cookie.
                    res.cookie(jwtCookie, 'toke')
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({
                                userId: user._id, // c'est le payload, et on encode le userId dans le token pour éviter qu'un user modifie des données d'un autre user
                            },
                            process.env.APP_SECRET, {
                                expiresIn: "24h",
                            }
                        ),
                    });
                })
                .catch((error) =>
                    res.status(500).json({
                        error,
                    })
                );
        })
        .catch((error) =>
            res.status(500).json({
                error,
            })
        );
};