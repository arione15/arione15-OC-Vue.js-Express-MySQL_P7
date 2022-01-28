import Vue from 'vue'
import App from './App.vue'
import router from './router'
//import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { sync } from 'vuex-router-sync'
import store from './store/store'
//import Panel from './components/Panel'
import VueYouTubeEmbed from 'vue-youtube-embed'
//import setHeaders from './utils'
import axios from 'axios'


import 'material-design-icons-iconfont/dist/material-design-icons.css';
import vuetify from './plugins/vuetify';

Vue.use(vuetify)
Vue.use(VueYouTubeEmbed)

if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + sessionStorage.getItem("token")
}
Vue.prototype.$axios = axios

Vue.config.productionTip = false

//Vue.component('panel', Panel)

sync(store, router)

new Vue({
    router,
    store,
    render: h => h(App),
    vuetify: new vuetify()
}).$mount('#app')