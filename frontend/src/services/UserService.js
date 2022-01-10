import Api from './Api'

export default {
    getAllUsers() {
        return Api.get('/user', {
            withCredentials: true
        })
    },
    getOneUser(id) {
        return Api.get(`/user/${id}`, {
            withCredentials: true
        })
    },
    updateUser(id, formdata) { // envoi des données par post sur 3000, qui vont être récupérées dans app.js : app.post('/', (req, res) ...)
        return Api.put(`user/${id}`, formdata, {
            withCredentials: true
        })
    }
}