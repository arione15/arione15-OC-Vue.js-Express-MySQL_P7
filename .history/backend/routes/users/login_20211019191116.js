const auth = require('../../middlewares/authorize');
const multer = require('../../middlewares/multer-config');
const bcrypt = require('bcrypt');
const { User } = require('../../config/dbConfig');

module.exports = (app) => {
    app.post('/api/login', (req, res) => {
        User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if(!user) {
                const message = `L'utilsateur demandé n'existe pas !`;
                res.status(404).json({ message });
            }
            bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {if(!isPasswordValid) {
            const message = `Le mot de passe est incorrect !`;
            res.status(401).json({ message });
        }
        const message = `Le mot de passe est incorrect !`;
        res.status(401).json({ message });
        
        
        })
        }).catch(error => console.log(error))
    })
}