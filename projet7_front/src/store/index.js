import Vuex from "vuex";
import Vue from "vue";
import createPersistedState from "vuex-persistedstate";
import auth from "./modules/auth";
import moment from 'moment';

// Load Vuex
Vue.use(Vuex);

Vue.filter('formatDate', function(value) {
  if (value) {
      return moment(String(value)).format('DD/MM/YYYY à HH:mm')
  }
});

// Create store
export default new Vuex.Store({
  modules: {
    auth,
  },
  plugins: [createPersistedState()],
});