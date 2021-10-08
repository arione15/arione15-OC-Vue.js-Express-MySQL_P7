import Api from './Api'

export default {
    register(credentials) { // envoi 
        return Api().post('login', credentials);
    }
}