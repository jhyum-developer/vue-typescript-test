import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import * as vrix  from './vrix';


const app = createApp(App);
// app.use(store).use(router).use(vrix).mount('#app');
app.use(store).use(router).mount('#app');

