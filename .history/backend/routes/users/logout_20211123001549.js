const auth = require("../../middlewares/authorize");
const multer = require("../../middlewares/multer-config");
const bcrypt = require("bcrypt");
const { User } = require("../../config/dbConfig");
const jwt = require("jsonwebtoken");

module.exports = (app) => {
    app.get("/api/logout", (req, res) => {
        res.cookie('jwtCookie', '', {
            maxAge: 1
        });
        res.location('/');
        res.status(302).json({
            message: "user disconnected
        });
    });
};