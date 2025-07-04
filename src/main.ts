import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VueReCaptcha } from 'vue-recaptcha-v3';
import AOS from 'aos';
import App from './App.vue';
import router from './router';
import authInit from '@/plugins/authInit';
import 'aos/dist/aos.css';

const app = createApp(App);
const pinia = createPinia();

app.use(VueReCaptcha, {
  siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
});

AOS.init();
app.use(pinia);
app.use(router);
app.use(authInit); 

app.mount('#app');
