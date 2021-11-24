// @ts-nocheck
import { createApp } from 'vue';
import App from './App.vue';
import routers from '@/routers';
import store from '@/store';
import directives from '@/directives';

const app = createApp(App);
app.use(routers);
app.use(store);
app.use(directives);
app.mount('#app');
