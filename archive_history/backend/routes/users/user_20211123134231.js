const auth = require("../../middlewares/authorize");
const multer = require("../../middlewares/multer-config");
const bcrypt = require("bcrypt");
const { User } = require("../../config/dbConfig");
const jwt = require("jsonwebtoken");

module.exports = (app) => {
        app.post("/api/login", (req, res) => {

                    app.get('/api/posts', auth, (req, res) => {
                        Post.findAll()
                            .then(posts => {
                                const message = 'La liste des postes a bien été récupérée !';
                                res.json({ message, data: posts })
                            }).catch(error => console.log(error))
                    })
                }