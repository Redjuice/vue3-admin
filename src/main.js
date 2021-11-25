// @ts-nocheck
import { createApp } from 'vue';
import App from './App.vue';
import routes from '@/routes';
import store from '@/store';
import directives from '@/directives';
import filters from '@/filters';

const app = createApp(App);
app.use(routes);
app.use(store);
app.use(directives);
app.use(filters);
app.config.globalProperties.$ELEMENT = {
  size: 'small'
};
app.mount('#app');
