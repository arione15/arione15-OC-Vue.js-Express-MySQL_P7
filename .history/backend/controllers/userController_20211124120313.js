const { User } = require("../../config/dbConfig");
const bcrypt = require("bcrypt");
const Joi = require("joi"); //  valider le mot de passe côté client
const jwt = require("jsonwebtoken");

/*  *********************************************************** */
//  I. Contrôleur pour l'enregistrement d'un nouvel utilisateur
/*  *********************************************************** */
// 1- valider les input de l'email et du mdp, 2- crypter le mdp, 3- créer nouvel user, 4- l'enregistrer dans la BDD
exports.signup = async(req, res) => {
const { name, firstname, email, password, imageUrl } = req.body;

const alreadyExistsUser = await User.findOne({ where: { email } }).catch(err => { console.log("Erreur :", err); });
if (alreadyExistsUser) {
    return res.json({ message: "Cet email est pris, choisiisez-en un autre !" });
}
bcrypt.hash(req.body.password, 10).then(hashed => {
    const newUser = new User({
        name: req.body.name,
        firstname: req.body.firstname,
        email: req.body.email,
        password: hashed,
        //imageUrl: req.body.imageUrl
    });

    const savedUser = newUser.save().then(_ =>
        res.status(201).json({ message: "Utilisateur créé !" })).catch(err => {
        console.log("Erreur :", err);
        res.json({ error: "Impossible d'enregistrer cet utilisateur pour le moment !" });
    });
});
});
}

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
                    } // si la comparaison est valide, on répond par l'envoi du token (avec le userId qui va avec) et on l'envoie dans un cookie.
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
                    res.cookie('jwtCookie', token, {
                        httpOnly: true,
                        process.env.MAX_AGE
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
}; /*  ****************************************************** */
//  II. Contrôleur pour gérer la déconnexion d'un utilisateur
/*  ****************************************************** */
exports.login = (req, res, next) => {