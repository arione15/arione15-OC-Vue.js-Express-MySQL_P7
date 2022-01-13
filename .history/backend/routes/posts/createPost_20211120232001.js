const auth = require('../../middlewares/authorize');
const multer = require('../../middlewares/multer-config');

const { Post } = require('../../config/dbConfig');

module.exports = (app) => {
    app.post('/api/posts', (req, res) => {
        Post.create(req.body)
            .then(post => {
                const message = `Le post ${req.body.title} a bien été créé !`;
                res.json({ message, data: post })
            }).catch(error => console.log(error))
    })
}