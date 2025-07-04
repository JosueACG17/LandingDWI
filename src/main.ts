import './assets/main.css'

import AOS from 'aos'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { VueReCaptcha } from 'vue-recaptcha-v3'

import 'aos/dist/aos.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(VueReCaptcha, {
  siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
  loaderOptions: {},
})

AOS.init()
app.use(createPinia())
app.use(router)

app.mount('#app')
