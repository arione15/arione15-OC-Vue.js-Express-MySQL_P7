const axios = require('axios');

const instanceAxios = axios.create({
    baseURL: `http://localhost:8080/`
})

function register(credentials){
    return instanceAxios().post('login', credentials);
}

module.exports = register; // module.exports = Authentication n'a pas marché dans Login.vue / methods/register()