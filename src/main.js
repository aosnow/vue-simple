// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

import { ApiInstaller } from '../packages/api/Api';
import interceptors from './interceptor';
import { LocalConf, SrvConf } from './conf/axios.conf';

// import { HttpErrorInfo } from '../packages';
//
// console.warn(JSON.stringify(HttpErrorInfo['404']));
// HttpErrorInfo.merge({ 404: 'Page not found.' });
// console.warn(JSON.stringify(HttpErrorInfo['404']));

Vue.config.productionTip = false;

// 初始化完成
Vue.use(ApiInstaller, { local: LocalConf, srv: SrvConf, interceptors });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
