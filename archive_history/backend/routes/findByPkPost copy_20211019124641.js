const auth = require('../middlewares/authorize');
const multer = require('../middlewares/multer-config');

const { Post } = require('../config/dbConfig');

module.exports = (app) => {
    app.delete('/api/posts/:id', (req, res) => {
        Post.findByPk(req.params.id)
        .then(post => {
            const postDeleted = post;
            Post.destroy({where: {id: req.body.id}})
            .then(_ => {
                const message = `Le post ${post.id} a bien été modifié !`;
                res.json({ message, data: req.body })
            })
        }).catch(error => console.log(error))
    })
}

