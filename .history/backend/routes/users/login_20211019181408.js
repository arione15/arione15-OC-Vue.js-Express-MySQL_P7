const auth = require('../../middlewares/authorize');
const multer = require('../../middlewares/multer-config');
const bcrypt = require('bcrypt');
const { User } = require('../../config/dbConfig');

module.exports = (app) => {
    app.post('/api/login', (req, res) => {
        User.findOne({ where: { email: req.body.email } })
        .then(user => {
            bcrypt.compare()
            const message = `Le post ${req.body.title} a bien été créé !`;
            res.json({ message, data: post })
        }).catch(error => console.log(error))
    })
}