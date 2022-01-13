import Api from './Api'

export default {
    createComment(post) { // envoi des données par post sur 3000, qui vont être récupérées dans app.js : app.post('/', (req, res) ...)
        return Api.post(`/${id}`, post, {
            withCredentials: true
        })
    },
    getAllComments() { // récupération des données par get sur 3000 (serveur backend) et qui vont être récupérés dans app.js : app.post('/', (req, res) ...)
        return Api.get(`comment/${id}`, {
            withCredentials: true
        })
    },
    deleteComment(postId, formdata) { // envoi des données par post sur 3000, qui vont être récupérées dans app.js : app.post('/', (req, res) ...)
        return Api.delete(`comment / $ { postId }
                `, formdata, {
            withCredentials: true
        })
    }
}