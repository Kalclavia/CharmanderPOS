import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)

app.use(router)
app.use(VueCookies)

app.use(vue3GoogleLogin, {
    clientId: '964792734838-8vo14im7viclrevna15i5k7mid2n1v32.apps.googleusercontent.com'
  })

app.mount('#app')