import { createApp } from 'vue'
import { createPinia } from 'pinia'
import dataV from '@jiaminghi/data-view'
import  router  from "./router";
import App from './App.vue'

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
const app = createApp(App);

app.use(router);
app.use(dataV);
app.use(ElementPlus);
app.use(createPinia())
app.mount('#app')
