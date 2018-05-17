import Vue from 'vue';
import { PersistedAction, PersistedConfig, STORAGE_TYPE } from '../../packages/plugins/PersistedState';

// 注册需要缓存的 mutation
// PersistedConfig.add({ type: 'info/save', storage: STORAGE_TYPE.sessionStorage });
PersistedConfig.batch([
  { type: 'info/save', storage: STORAGE_TYPE.memory, expire: 5 }
]);

const State = {
  dataset: null
};

// 同步立即更新
const MutAtions = {
  /**
   * 保存数据
   */
  save(state, params) {
    const { data } = params;
    state.dataset = data;
    // Vue.set(state, 'dataset', data);
    // console.warn(state.dataset);
  }
};

// 异步请求数据
const Actions = {
  persist: PersistedAction,
  /**
   * 初始化请求权限配置数据
   * @param commit 派发同步操作的方法，指向到 MutActions
   */
  fetch({ dispatch }, data) {
    return dispatch('persist', {
      type: 'info/save',
      force: false,
      getData() {
        // 该方法淘汰
        // return Vue.$api.post('/api.php', null);

        // 直接包装一层 Promise，对 response 数据进行任意过滤、解析
        // 解析后的数据再交给持久化数据引擎进行缓存
        return new Promise((resolve, reject) => {
          Vue.$api.post('/api.php', data).then(res => {
            // 不需要再提交 commit，而是交给 PersistedAction 代理提交
            // commit('save', res);

            // 对数据进行任意解析、运算、过滤逻辑
            res = res.data;

            // 将最终结果数据抛出给 PersistedAction 进行缓存
            resolve(res);
          }).catch(reason => {
            reject(reason);
          });
        });
      }
    });
  }
};

const Getters = {
  dataset: state => state.dataset
};

export default {
  namespaced: true,
  strict: true,
  state: State,
  getters: Getters,
  mutations: MutAtions,
  actions: Actions
};
