import Api from './Api'

export default {
    register(credentials) { // envoi les identifiant par post sur 8080
        return Api().post('login', credentials);
    }
}