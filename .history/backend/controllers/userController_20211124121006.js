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
};

/*  ****************************************************** */
//  I. Contrôleur pour gérer la connexion d'un utilisateur
/*  ****************************************************** */
// 1- vérifier si l'utilisateur est enregistré, 2- envoyer un token avec un payload (ici le userId)
exports.login = (req, res) => {
    User.findOne({ where: { email: req.body.email } })
        .then((user) => {
            if (!user) {
                const message = `L'utilsateur demandé n'existe pas !`;
                res.status(404).json({ message });
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then((isPasswordValid) => {
                    if (!isPasswordValid) {
                        const message = `Le mot de passe est incorrect !`;
                        res.status(401).json({ message });
                    }
                    // si la comparaison est valide, on répond par l'envoi du token (avec le userId qui va avec) et on l'envoie dans un cookie.
                    const token = jwt.sign( //générer le token
                        { userId: user.id },
                        process.env.SECRET_KEY, { expiresIn: "24h" }
                    );
                    const message = `L'utilsateur s'est connecté avec succès !`;
                    res.cookie('jwtCookie', token, {
                        httpOnly: true,
                        maxAge: parseInt(process.env.MAX_AGE)
                    });
                    res.status(200).json({ message, data: user, token }); // retourner le token au client
                })
        })
        .catch((error) => {
            const message = `L'utilsateur n'a pas pu se connecter !`;
            res.status(500).json({ message, data: error });
        });
};

/*  ****************************************************** */
//  II. Contrôleur pour gérer la déconnexion d'un utilisateur
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
//  II. Contrôleur pour gérer la déconnexion d'un utilisateur
/*  ****************************************************** */