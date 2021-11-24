// @ts-nocheck
import { createApp } from 'vue';
import App from './App.vue';
import routers from '@/routers';
import store from '@/store';
import directives from '@/directives';
import filters from '@/filters';

const app = createApp(App);
app.use(routers);
app.use(store);
app.use(directives);
app.use(filters);
app.mount('#app');
