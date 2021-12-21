import Api from './Api'

export default {
    getAllPosts() { // récupération des données par get sur 3000 (serveur backend) et qui vont être récupérés dans app.js : app.post('/signup', (req, res) ... où /signup est aussi sur 3000 et qui va envoyer vers le frontend : récuperer dans Signup.vue await...)
        return Api.get('/post')
    },
    createPost(post) { // récupération des données par get sur 3000 (serveur backend) et qui vont être récupérés dans app.js : app.post('/signup', (req, res) ... où /signup est aussi sur 3000 et qui va envoyer vers le frontend : récuperer dans Signup.vue await...)
        return Api.post('/post', post)
    }
}