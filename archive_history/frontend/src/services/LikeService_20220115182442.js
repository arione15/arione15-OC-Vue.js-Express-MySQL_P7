import Api from './Api'

export default {
    createLike(postId, message) { // envoi des données par post sur 3000, qui vont être récupérées dans app.js : app.post('/', (req, res) ...)
        return Api.post(`/comment/${postId}`, {
            message,
        }, {
            withCredentials: true
        })
    }
}