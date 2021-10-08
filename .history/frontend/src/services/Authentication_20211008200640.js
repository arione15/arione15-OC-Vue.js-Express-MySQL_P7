import Api from './Api'

export default {
    register(credentials) { // envoi les identifiant 
        return Api().post('login', credentials);
    }
}