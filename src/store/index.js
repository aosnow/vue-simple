import Vue from 'vue';
import Vuex from 'vuex';
import Info from './info';
import { PersistedPlugin } from '../../packages/plugins/PersistedState';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    info: Info
  },
  plugins: [PersistedPlugin]
});
