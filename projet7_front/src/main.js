import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store';

// axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:3000/';
//route du back

Vue.config.productionTip = false


// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin pour la mise en page 
Vue.use(IconsPlugin)

Vue.use(VueAxios, axios)
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
//axios pour faire les appel au back
// store pour stocker utilisateur etc