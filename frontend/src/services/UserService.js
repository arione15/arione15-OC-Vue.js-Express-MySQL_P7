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
    updateUser(id, formdata) {
        return Api.put(`user/${id}`, formdata, {
            withCredentials: true
        })
    },
    deleteUser(id) {
        return Api.delete(`user/${id}`, {
            withCredentials: true
        })
    }
}