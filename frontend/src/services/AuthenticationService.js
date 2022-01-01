import Api from './Api'

export default {
    signupUser(credentials) { // envoi les renseignements par post sur 3000 (serveur backend) et qui vont être récupérés dans app.js : app.post('/signup', (req, res) ... où /signup est aussi sur 3000 et qui va envoyer vers le frontend : récuperer dans Signup.vue await...)
        return Api.post('/user/signup', credentials)
    },
    login(credentials) { // envoi les identifiants par post sur 3000 (serveur backend) et qui vont être récupérés dans app.js : app.post('/login', (req, res) ... où /signup est aussi sur 3000 et qui va envoyer vers le frontend : récuperer dans Login.vue await...)
        return Api.post('/user/login', credentials)
    }
}