const auth = require("../../middlewares/authorize");
const multer = require("../../middlewares/multer-config");
const bcrypt = require("bcrypt");
const { User } = require("../../config/dbConfig");
const jwt = require("jsonwebtoken");

module.exports = (app) => {
    app.post("/api/logout", (req, res) => {
        res.cookie('jwtCookie', '', {
            maxAge: 1 // suppression instantannée (1 milliseconde)
        });
        res.status(200).json({ message: "utilisateur déconnecté" });
        res.redirect('/');
    });
};