import Api from './Api'

export default {
    register(credentials) { // envoi les identifiant par post sur 
        return Api().post('login', credentials);
    }
}