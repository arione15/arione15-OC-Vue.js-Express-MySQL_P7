import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Posts from '../views/Posts.vue'
import ViewPost from '../views/ViewPost.vue'
import EditPost from '../views/EditPost.vue'
import ViewProfil from '../views/ViewProfil.vue'
import EditProfil from '../views/EditProfil.vue'
import Admin from '../views/Admin.vue'
import EditRole from '../views/EditRole.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        { path: '/', name: 'Home', component: Home },
        { path: '/signup', name: 'Signup', component: Signup },
        { path: '/login', name: 'Login', component: Login },
        { path: '/posts', name: 'Posts', component: Posts },
        { path: '/posts/:postId', name: 'Post', component: ViewPost },
        { path: '/posts/:postId/edit', name: 'Post-edit', component: EditPost },
        { path: '/users/:id', name: 'Profil', component: ViewProfil },
        { path: '/users/:id/edit', name: 'Profil-edit', component: EditProfil },
        { path: '/users/:id/role', name: 'Role-edit', component: EditRole },
        { path: '/admin', name: 'Admin', component: Admin },
    ],
    mode: 'history'
        //base: process.env.BASE_URL
})

export default router