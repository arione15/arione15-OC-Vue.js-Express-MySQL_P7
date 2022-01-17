const auth = require("../../middlewares/authorize");
const multer = require("../../middlewares/multer-config");
const bcrypt = require("bcrypt");
const { User } = require("../../config/dbConfig");
const jwt = require("jsonwebtoken");
const checkUser = require('./middlewares/authUser');

// récupérer tous les utilisateurs
module.exports = (app) => {
    app.get('/api/user', (req, res) => {
        User.findAll()
            .then(users => {
                const message = 'La liste des utilisateurs a bien été récupérée !';
                res.json({ message, data: users })
            }).catch(error => console.log(error))
    })
}