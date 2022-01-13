import Api from './Api'

export default {
    createComment() { // envoi des données par post sur 3000, qui vont être récupérées dans app.js : app.post('/', (req, res) ...)
        return Api.post(`/${id}`, {
            withCredentials: true
        })
    },
    getAllComments() { // récupération des données par get sur 3000 (serveur backend) et qui vont être récupérés dans app.js : app.post('/', (req, res) ...)
        return Api.get(`comment/${id}`, {
            withCredentials: true
        })
    },
    deleteComment(id) { // envoi des données par post sur 3000, qui vont être récupérées dans app.js : app.post('/', (req, res) ...)
        return Api.delete(`comment/${id}`, {
            withCredentials: true
        })
    }
}