const auth = require('../middlewares/authorize');
const multer = require('../middlewares/multer-config');

const { Post } = require('../config/dbConfig');

module.exports = (app) => {
    app.post('/api/posts', (req, res) => {
        Post.findByPk(req.params.id)
        .then(post => {
            const message = 'Un post a bien été récupérée !';
            res.json({ message, data: post })
        }
            )
    })
}

