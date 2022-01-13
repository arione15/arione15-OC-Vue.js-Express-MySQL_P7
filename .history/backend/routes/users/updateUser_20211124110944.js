const multer = require("../../middlewares/multer-config");
const { User } = require("../../config/dbConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../../middlewares/authorize");

// modifier un utilisateur
module.exports = (app) => {
    app.put('/api/user/:id', (req, res) => {
        const id = req.params.id;
        User.update(req.body, { where: { id: id } })
            .then(_ => {
                User.findByPk(id).then(user => {
                    const message = `L'utilisateur ${user.name} a bien été modifié !`;
                    res.json({ message, data: req.body })
                })
            }).catch(error => console.log(error))
    })
}