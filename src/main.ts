import { createApp } from 'vue'
import { createPinia } from 'pinia'
import dataV from '@jiaminghi/data-view'
import  router  from "./router";
import App from './App.vue'
const app = createApp(App)

app.use(createPinia())
app.use(router);
app.use(dataV);

app.mount('#app')
