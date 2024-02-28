import 'solana-wallets-vue/styles.css'
import './main.css'

import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { sync } from 'vuex-router-sync'

import axios from 'axios'
import VueAxios from 'vue-axios'

import routes from './routes'
import store from './vuex'
import App from './App.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    store
})

sync(store, router);

const app = createApp(App)
app.use(router)
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)
app.mount('#app')
