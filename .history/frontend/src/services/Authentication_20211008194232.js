import 
const instanceAxios = 

function register(credentials){
    return instanceAxios().post('login', credentials);
}

module.exports = register; // module.exports = Authentication n'a pas marché dans Login.vue/methods/register()