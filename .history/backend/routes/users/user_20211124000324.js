const auth = require("../../middlewares/authorize");
const multer = require("../../middlewares/multer-config");
const bcrypt = require("bcrypt");
const { User } = require("../../config/dbConfig");
const jwt = require("jsonwebtoken");

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

// récupérer un utilisateur
module.exports = (app) => {
    app.get('/api/user/:id', (req, res) => {
        const id = req.params.id;
        User.findByPk(id)
            .then(user => {
                const message = 'Un utilisateur a bien été récupéré !';
                res.json({ message, data: user })
            }).catch(error => console.log(error))
    })
}

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
    app.delete('/api/user/:id', auth, (req, res) => {
        User.findByPk(req.params.id)
            .then(post => {
                const userDeleted = user;
                Post.destroy({ where: { id: post.id } })
                    .then(_ => {
                        const message = `Le post ayant l'identifiant ${postDeleted.id} a bien été supprimé !`;
                        res.json({ message, data: postDeleted })
                    })
            }).catch(error => console.log(error))
    })
}