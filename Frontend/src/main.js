import { createRouter, createWebHistory, RouterLink } from 'vue-router';
import { createApp } from 'vue';
import { Quasar, Notify } from 'quasar';
import router from './router';
import { createPinia } from 'pinia';
import quasarIconSet from 'quasar/icon-set/material-icons';
import quasarLanguage from 'quasar/lang/en-US';
import 'quasar/dist/quasar.css';

import './style.css';

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css';
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css';

// Import Quasar css
import 'quasar/src/css/index.sass';

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue';

const app = createApp(App);
const pinia = createPinia();

//app.component('RouterLink', RouterLink);
app.use(pinia);
app.use(router);

app.use(Quasar, {
  plugins: { Notify },
  lang: quasarLanguage,
  iconSet: quasarIconSet,
});

// Assumes you have a <div id="app"></div> in your index.html
app.mount('#app');
