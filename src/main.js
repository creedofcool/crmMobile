import { createApp } from 'vue'
import App from './App.vue'
import Vant from 'vant';
import 'vant/lib/index.css';
// import VueRouter from 'vue-router';
import router from './router/index.js';

createApp(App).use(Vant).use(router).mount('#app')
