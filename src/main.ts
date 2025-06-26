import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueReCaptcha } from 'vue-recaptcha-v3'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(VueReCaptcha, {
  siteKey: '6LeEzm4rAAAAAHcWBSYMJi1e2fNNSJ2QWj8o8fyX',
})

app.use(createPinia())
app.use(router)

app.mount('#app')
