import Api from './services/Api'

export default {
    register(credentials) {
        return Api().post('login', credentials);
    }
}
const instanceAxios = 

module.exports = register; // module.exports = Authentication n'a pas marché dans Login.vue/methods/register()