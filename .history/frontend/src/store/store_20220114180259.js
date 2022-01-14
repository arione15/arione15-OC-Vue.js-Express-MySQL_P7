import Vue from 'vue'
import Vuex from 'vuex'
//import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    //strict: true,
    // plugins: [
    //     createPersistedState()
    // ],
    state: {
        token: null,
        user: null,
        //post: null,
        isUserLoggedIn: false
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
            if (token) { state.isUserLoggedIn = true } else { state.isUserLoggedIn = false }
            //state.isUserLoggedIn = !!(token)
        },
        SET_USER(state, user) {
            state.user = user
        },
        // SET_POST(state, post) {
        //     state.post = post
        // }
    },
    actions: {
        setToken({ commit }, token) {
            commit('SET_TOKEN', token)
        },
        setUser({ commit }, user) {
            commit('SET_USER', user)
        },
        // setPost({ commit }, post) {
        //     commit('setPost', post)
        // }
        // h
        // setToken({ dispatch }, token) {
        //     dispatch('SET_TOKEN', token)
        // },
        // setUser({ dispatch }, user) {
        //     dispatch('SET_USER', user)
        // }
        sendconsole.log("bbbb", isUserLoggedIn);
    }
})