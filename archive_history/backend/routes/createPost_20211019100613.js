const auth = require('../middlewares/authorize');
const multer = require('../middlewares/multer-config');

const { Post } = require('../config/dbConfig');

module.exports = (app) => {
    app.post('/api/posts', (req, res) => {
        Post.create(req.body)
        .then(post => {
            const message = 'Un post a bien été créée !';
            res.json({ message, data: post })
        }
            )
    })
}

