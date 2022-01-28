const { User } = require("../../config/dbConfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = require("../../middlewares/authorize");
const checkUser = require('../../middlewares/authUser');

const multer = require("../../middlewares/multer-config");

module.exports = (app) => {
    app.get("/api/logout", (req, res) => {
        res.cookie('jwtCookie', '', {
            maxAge: 1 // suppression instantannée (1 milliseconde)
        });
        res.status(200).json({
            message: "utilisateur déconnecté",
            redirect: '/'
        });
    });
};