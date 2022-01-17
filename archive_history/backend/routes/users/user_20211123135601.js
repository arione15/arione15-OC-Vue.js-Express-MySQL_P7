const auth = require("../../middlewares/authorize");
const multer = require("../../middlewares/multer-config");
const bcrypt = require("bcrypt");
const { User } = require("../../config/dbConfig");
const jwt = require("jsonwebtoken");

module.exports = (app) => {
    app.get('/api/user', (req, res) => {
        User.findAll()
            .then(users => {
                const message = 'La liste des utilisateurs a bien été récupérée !';
                res.json({ message, data: users })
            }).catch(error => console.log(error))
    })
}

module.exports = (app) => {
    app.get('/api/user/:id', (req, res) => {
        Post.findByPk(req.params.id)
            .then(post => {
                const message = 'Un post a bien été récupérée !';
                res.json({ message, data: post })
            }).catch(error => console.log(error))
    })
}