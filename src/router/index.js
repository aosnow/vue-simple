import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home';
import AxiosTest from '../views/AxiosTest';
import PersistedStateTest from '../views/PersistedStateTest';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '', redirect: '/home' },
    { path: '/home', component: Home, meta: { title: '首页' } },
    { path: '/axios', component: AxiosTest, meta: { title: 'Axios 测试' } },
    { path: '/state', component: PersistedStateTest, meta: { title: 'PersistedState 测试' } }
  ]
});
