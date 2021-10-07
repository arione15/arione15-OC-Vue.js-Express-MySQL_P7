const axios = require('axios');

const instanceAxios = axios.create({
    baseURL: `http://localhost:8081/`
})

function register(credentials){
    return instanceAxios().post('login', credentials);
}

module.exports = Authentication;