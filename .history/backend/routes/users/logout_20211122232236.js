const auth = require("../../middlewares/authorize");
const multer = require("../../middlewares/multer-config");
const bcrypt = require("bcrypt");
const { User } = require("../../config/dbConfig");
const jwt = require("jsonwebtoken");

module.exports = (app) => {
    app.get("/api/logout", (req, res) => {
        res.cookie('jwtCookie', '', {
            maxAge: 1 // suppression instantannée (1 milliseconde)
        });
        res.redirect(200, '/').json({ message: "utilisateur déconnecté" });
    });
};