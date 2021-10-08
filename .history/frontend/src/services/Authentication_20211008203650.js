import Api from './Api'

export default {
    register(credentials) { // envoi les identifiant par post sur 3000 (serveur bacfrontend) et qui va êttre récupérer dans app.js app.post('/login', (req, res) ... où /login dans ce dernier cas est sur 3000 (serveur backend)
        return Api().post('login', credentials);
    }
}