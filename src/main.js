import './assets/main.scss';
import '@quasar/extras/material-icons/material-icons.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import { Quasar, Cookies, Notify } from 'quasar';
import quasarLang from 'quasar/lang/zh-TW';
// Import icon libraries

// Import Quasar css
import 'quasar/dist/quasar.css';
import App from './App.vue';

const app = createApp(App);

app.use(createPinia());
app.use(Quasar, {
  plugins: { Cookies, Notify }, // import Quasar plugins and add here
  lang: quasarLang,
  config: {
    cssAddon: true,
  },
});
app.mount('#app');
