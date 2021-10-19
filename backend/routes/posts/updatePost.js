const auth = require('../../middlewares/authorize');
const multer = require('../../middlewares/multer-config');

const { Post } = require('../../config/dbConfig');

module.exports = (app) => {
    app.put('/api/posts/:id', (req, res) => {
        const id = req.params.id;
        Post.update(req.body, { where: {id: id} })
        .then(_ => {
            Post.findByPk(id).then(post => {
                const message = `Le post ${post.title} a bien été modifié !`;
                res.json({ message, data: req.body })
            })
        }).catch(error => console.log(error))
    })
}

