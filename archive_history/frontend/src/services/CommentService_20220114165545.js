//import Api from './Api'

export default {
    // getAllComments() { // récupération des données par get sur 3000 (serveur backend) et qui vont être récupérés dans app.js : app.post('/', (req, res) ...)
    //     return Api.get('/post', {
    //         withCredentials: true
    //     })
    // },
    // getOneComment(postId) {
    //     return Api.get(`post/${postId}`, {
    //         withCredentials: true
    //     })
    // },
    // getUserPosts(id) {
    //     return Api.get(`post/posts/${id}`, {
    //         withCredentials: true
    //     })
    // },
    createComment(postId, userId, message) { // envoi des données par post sur 3000, qui vont être récupérées dans app.js : app.post('/', (req, res) ...)
        return Api.post('/post', {
            postId, //récupérée depuis v-for post
            userId, //récupérée depuis v-for post
            message,
        }, {
            withCredentials: true
        })
    },
    // deleteComment(postId, formdata) { // envoi des données par post sur 3000, qui vont être récupérées dans app.js : app.post('/', (req, res) ...)
    //     return Api.put(`post/${postId}`, formdata, {
    //         withCredentials: true
    //     })
    // }
}