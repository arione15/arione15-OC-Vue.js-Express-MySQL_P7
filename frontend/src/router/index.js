import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../components/Signup.vue'
import Login from '../components/Login.vue'
import Logout from '../components/Logout.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        { path: '/', name: 'Home', component: Home },
        { path: '/signup', name: 'Signup', component: Signup },
        { path: '/login', name: 'Login', component: Login },
        { path: '/logout', name: 'Logout', component: Logout },
        // { path: '/board', name: 'Board', component: { render: (h) => h("div", ["Board Page"]) } }
    ],
    mode: 'history',
    //base: process.env.BASE_URL
})

export default router