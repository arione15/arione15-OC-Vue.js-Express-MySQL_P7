import Api from './Api'

export default {
    register(credentials) { // envoi les identifiant par post sur 3000 (serveur backend) et qui va êttre récupérer dans app.js app.post('/login', (req, res) ... où /login est aussi sur 3000 )
        return Api().post('login', credentials);
    }
}