import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Logout from '../components/Logout.vue'
import Posts from '../views/Posts.vue'
import CreatePost from '../views/CreatePost.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        { path: '/', name: 'Home', component: Home },
        { path: '/signup', name: 'Signup', component: Signup },
        { path: '/login', name: 'Login', component: Login },
        { path: '/logout', name: 'Logout', component: Logout },
        { path: '/posts', name: 'Posts', component: Posts },
        { path: '/posts/create', name: 'Post-create', component: CreatePost },
        // { path: '/board', name: 'Board', component: { render: (h) => h("div", ["Board Page"]) } }
    ],
    mode: 'history'
        //base: process.env.BASE_URL
})

export default router