import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Posts from '../views/Posts.vue'
import CreatePost from '../views/CreatePost.vue'
import ViewPost from '../views/ViewPost.vue'
import EditPost from '../views/EditPost.vue'
import Profils from '../views/Profils.vue'
import ViewProfil from '../views/ViewProfil.vue'
import EditProfil from '../views/EditProfil.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        { path: '/', name: 'Home', component: Home },
        { path: '/signup', name: 'Signup', component: Signup },
        { path: '/login', name: 'Login', component: Login },
        { path: '/posts', name: 'Posts', component: Posts },
        { path: '/posts/create', name: 'Post-create', component: CreatePost },
        { path: '/posts/:postId', name: 'Post', component: ViewPost },
        { path: '/posts/:postId/edit', name: 'Post-edit', component: EditPost },
        { path: '/users', name: 'Profils', component: Profils },
        { path: '/users/:id', name: 'Profil', component: ViewProfil },
        { path: '/users/:id/edit', name: 'Profil-edit', component: EditProfil },
        // { path: '/board', name: 'Board', component: { render: (h) => h("div", ["Board Page"]) } }
    ],
    mode: 'history'
        //base: process.env.BASE_URL
})

export default router