/**
 * 左侧菜单数据
 */
import Vue from 'vue';
import { PersistedAction, PersistedConfig, STORAGE_TYPE, hash } from '../../packages';

import ApiConf from '../conf/api.conf';

PersistedConfig.batch([
  // { type: `shop/${types.SET_PAGE_CONFIG}`, storage: STORAGE_TYPE.localStorage },
  { type: 'menu/setMenuList', storage: STORAGE_TYPE.sessionStorage, expire: 600 } // 10分钟过期重新取
]);

const State = {
  menuList: {}
};

const Getters = {
  menuList: state => state.menuList
};

// 同步立即更新
const MutAtions = {
  setLoaded(state, params) {
    state.loaded = params;
  },
  /**
   * 设置新的用户数据
   * @param state
   * @param params
   */
  setMenuList(state, params) {
    state.menuList = params.data;

    // console.warn('setMenuList-params:', params, map);
  }
};

// 异步请求数据
const Actions = {
  persist: PersistedAction,
  getMenuList({ dispatch }) {
    return dispatch('persist', {
      type: 'menu/setMenuList',
      getData() {
        return new Promise((resolve, reject) => {
          // 只有在登录成功进入，或者F5刷新浏览器时才重新请求菜单数据
          // 正常单页应用操作下跳转路由，菜单数据不会丢失，所以不再重复请求
          // if (!store.getters['menu/setMenuList']) {
          // 取用户 state 数据进行提交
          const params = {
            user_id: 4,
            type: 'EMPLOYEE'
          };

          // 真实菜单数据请求
          Vue.$api.post({ getway: ApiConf.user.$getway, api: ApiConf.user.menuLoadMenusByUser }, params, {
            headers: {
              token: 'ec70255e-79d3-4070-88af-38ae3f807317',
              invoke_source: '2200',
              out_request_no: hash()
            }
          }).then(response => {
            let result = response.data;
            console.warn('response:', response);
            if (result.code === '10000') {
              resolve(result);
            }
            else {
              reject(result);
            }
          }).catch(reason => {
            reject(reason);
          });
        });
      }
    });
  }
};

export default {
  namespaced: true,
  strict: true,
  state: State,
  getters: Getters,
  mutations: MutAtions,
  actions: Actions
};
