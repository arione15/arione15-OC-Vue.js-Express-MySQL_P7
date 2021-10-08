import Api from './Api'

export default {
    register(credentials) { // envoi les identifiant par post sur 8080 (serveur frontend) et qui va êttre récupérer dans app.js app.post('/login', (req, res) ... o
        return Api().post('login', credentials);
    }
}