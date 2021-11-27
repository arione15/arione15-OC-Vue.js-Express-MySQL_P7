const auth = require("../../middlewares/authorize");
const checkUser = require('../../middlewares/authUser');

const multer = require("../../middlewares/multer-config");
const bcrypt = require("bcrypt");
const { User } = require("../../config/dbConfig");
const jwt = require("jsonwebtoken");

// supprimer un utilisateur
module.exports = (app) => {
    app.delete('/api/user/:id', (req, res) => {
        User.findByPk(req.params.id)
            .then(user => {
                const userDeleted = user;
                User.destroy({ where: { id: user.id } })
                    .then(_ => {
                        const message = `L'utilisateur ayant l'identifiant ${userDeleted.id} a bien été supprimé !`;
                        res.json({ message, data: userDeleted })
                    })
            }).catch(error => console.log(error))
    })
}