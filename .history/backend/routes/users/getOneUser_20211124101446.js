const auth = require("../../middlewares/authorize");
const multer = require("../../middlewares/multer-config");
const bcrypt = require("bcrypt");
const { User } = require("../../config/dbConfig");
const checkUser = require('../../middlewares/authUser');

// récupérer un utilisateur
module.exports = (app) => {
    app.get('/api/user/:id', checkUser, (req, res) => {
        const id = req.params.id;
        User.findByPk(id)
            .then(user => {
                const message = 'Un utilisateur a bien été récupéré !';
                res.json({ message, data: user })
            }).catch(error => console.log(error))
    })
}