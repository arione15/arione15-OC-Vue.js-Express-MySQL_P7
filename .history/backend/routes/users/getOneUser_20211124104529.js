const
    User = require("../../config/dbConfig");
const checkUser = require('../../middlewares/authUser');
const multer = require("../../middlewares/multer-config");

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