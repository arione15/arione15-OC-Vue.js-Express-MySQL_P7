const auth = require("../../middlewares/authorize");
const multer = require("../../middlewares/multer-config");
const bcrypt = require("bcrypt");
const { User } = require("../../config/dbConfig");
const jwt = require("jsonwebtoken");
const Cookies = require('cookies');

module.exports = (app) => {
    app.post("/api/login", (req, res) => {
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
                        const cookieContent = {
                            token,
                            userId: results[0].id
                        }
                        const message = `L'utilsateur s'est connecté avec succès !`;
                        new Cookies(req, res).set('jwtCookie', token, {
                            httpOnly: true,
                            maxAge: parseInt(process.env.MAX_AGE)
                        });
                        res.status(200).json({ message, data: user, token }); // retourner le token au client
                    });
            })
            .catch((error) => {
                const message = `L'utilsateur n'a pas pu se connecter !`;
                res.status(500).json({ message, data: error });
            });
    });
};