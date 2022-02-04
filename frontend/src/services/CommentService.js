import Api from './Api'

export default {
    createComment(postId, message) { // envoi des données par post sur 3000, qui vont être récupérées dans app.js : app.post('/', (req, res) ...)
        return Api.post(`/comment/${postId}`, {
            message,
        }, {
            withCredentials: true
        })
    },
    deleteComment(id) { // envoi des données par post sur 3000, qui vont être récupérées dans app.js : app.post('/', (req, res) ...)
        return Api.delete(`/comment/${id}`, { withCredentials: true })
    }
}