const auth = require('../middlewares/authorize');
const multer = require('../middlewares/multer-config');

const { Post } = require('../config/dbConfig');

module.exports = (app) => {
    app.get('/api/posts', (req, res) => {
        Post.findAll()
        .then(posts => {
            const message = 'La liste des postes a bien été récupérée !';
            res.json({ message, data: posts })
        })
    })
}

