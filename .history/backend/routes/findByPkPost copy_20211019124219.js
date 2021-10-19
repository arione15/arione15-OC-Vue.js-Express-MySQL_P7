const auth = require('../middlewares/authorize');
const multer = require('../middlewares/multer-config');

const { Post } = require('../config/dbConfig');

module.exports = (app) => {
    app.delete('/api/posts/:id', (req, res) => {
        Post.findByPk(req.params.id)
        .then(post => {
            const postDeleted = post;
            PopStateEvent.destroy()
            .
            const message = 'Un post a bien été récupérée !';
            res.json({ message, data: post })
        }).catch(error => console.log(error))
    })
}

