const auth = require('../../middlewares/authorize');
const multer = require('../../middlewares/multer-config');

const { Post } = require('../../config/dbConfig');

module.exports = (app) => {
    app.delete('/api/posts/:id', auth(req, res) => {
        Post.findByPk(req.params.id)
            .then(post => {
                const postDeleted = post;
                Post.destroy({ where: { id: post.id } })
                    .then(_ => {
                        const message = `Le post ayant l'identifiant ${postDeleted.id} a bien été supprimé !`;
                        res.json({ message, data: postDeleted })
                    })
            }).catch(error => console.log(error))
    })
}