import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './assets/main.scss';

import { Quasar, Cookies } from 'quasar';
import quasarLang from 'quasar/lang/zh-TW';
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css';

// Import Quasar css
import 'quasar/dist/quasar.css';
import App from './App.vue';

const app = createApp(App);

app.use(createPinia());
app.use(Quasar, {
  plugins: { Cookies }, // import Quasar plugins and add here
  lang: quasarLang,
  config: {
    cssAddon: true,
  },
});
app.mount('#app');
