import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { sync } from 'vuex-router-sync'
import store from './store/store'

Vue.use(Vuetify)

Vue.config.productionTip = false

sync(store, router)

new Vue({
    router,
    store,
    render: h => h(App),
    vuetify: new Vuetify()
}).$mount('#app')