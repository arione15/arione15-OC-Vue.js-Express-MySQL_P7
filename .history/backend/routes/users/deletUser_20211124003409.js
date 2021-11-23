const auth = require("../../middlewares/authorize");
const multer = require("../../middlewares/multer-config");
const bcrypt = require("bcrypt");
const { User } = require("../../config/dbConfig");
const jwt = require("jsonwebtoken");


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