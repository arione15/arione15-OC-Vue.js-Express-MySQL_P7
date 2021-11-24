const auth = require("../../middlewares/authorize");
const multer = require("../../middlewares/multer-config");
const bcrypt = require("bcrypt");
const { User } = require("../../config/dbConfig");
const jwt = require("jsonwebtoken");
const Joi = require("joi"); //  valider le mot de passe côté client

/*  *********************************************************** */
//  I. Contrôleur pour l'enregistrement d'un nouvel utilisateur
/*  *********************************************************** */
// 1- valider les input de l'email et du mdp, 2- crypter le mdp, 3- créer nouvel user, 4- l'enregistrer dans la BDD

module.exports = (app) => {
    app.post("/api/authsignup", async(req, res) => {
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