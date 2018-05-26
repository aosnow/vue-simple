import Vue from 'vue';
import Vuex from 'vuex';
import Info from './info';
import Menu from './menu';
import { PersistedPlugin } from '../../packages/PersistedState';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    info: Info,
    menu: Menu
  },
  plugins: [PersistedPlugin]
});
