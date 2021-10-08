import Api from './Api'

export default {
    register(credentials) { // envoi les identifiant par post sur 3000 (serveur backend) et qui va êttre récupérer dans app.js app.post('/login', (req, res) ... où /login est aussi sur 3000 et qui va envoyer vers le frontend : récuperer dans Login.vue await)
        return Api().post('login', credentials);
    }
}