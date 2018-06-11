/**
 * @type {{all:Function}}
 */
import deepmerge from 'deepmerge';
import LocalStorage from './storages/local';
import SessionStorage from './storages/session';
import MemoryStorage from './storages/memory';
import STORAGE_TYPE from './storageType';

const [
  $unique,
  $options,
  $defaultOptions
] = [
  Symbol('unique'),
  Symbol('options'),
  Symbol('defaultOptions')
];

/**
 * 持久状态维护管理器
 */
class PersistedState {
  // 默认配置
  [$defaultOptions] = {
    expire: 0, // 0-永久不超时，直到生命周期结束; 其它值以 秒 为单位判断超时
    storage: STORAGE_TYPE.sessionStorage // 默认缓存存储引擎
  };

  // 当前配置
  [$options] = null;

  // 唯一识别码
  [$unique] = null;

  /**
   * 唯一识别码
   * <p>针对不同的应用起到“作用域”的作用，以避免应用与应用之间的数据混乱问题</p>
   * @param {string} code 唯一码（长度必须大于等于6位，且不能是全字母或全数字），如“F@K%$JD&LF”，或者应用的网站域名“abc.com”
   */
  set unique(code) {
    if (code === null || code === undefined || code.toLowerCase() === 'root' || code === '') {
      // 都指定到 root 顶级作用域，所有应用共用
      code = null;
    }
    else if (typeof code === 'string') {
      // 指定到特殊的“应用级局部作用域”

      // 不能包含空白字符
      if (/\s/i.test(code)) {
        throw new Error('PersistedState.unique -> no blank characters can be included');
      }

      // 不能小于6位
      if (code.length < 6) {
        throw new Error('PersistedState.unique -> the length is too small');
      }

      // 若只有字母、数字也警告
      if (/^[a-z0-9]+$/i.test(code)) {
        console.warn('PersistedState.unique -> it\'s too simple, should contain letters, numbers and special symbols.');
      }
    }

    this[$unique] = code;
  }

  get unique() {
    return `vue-simple-scope[${this[$unique] || 'root'}]`;
  }

  /**
   * 构建实例
   * @param {{store:Vuex, expire:Number, storage?:StateStorage}} [options] 全局配置，可通过私有配置进行覆盖
   */
  constructor(options) {
    this[$options] = deepmerge.all([{}, this[$defaultOptions], options || {}]);
  }

  /**
   * 检测获取最终可用的 storage 引擎
   * @param {String} [storageType] 存储引擎类型
   * @returns {*|{type, storage, getItem, setItem, removeItem, clear}|Map|Storage|StorageEvent|boolean}
   */
  validStorage(storageType) {
    storageType = storageType || this[$options].storage || STORAGE_TYPE.memory;

    switch (storageType) {
      case STORAGE_TYPE.localStorage: {
        return LocalStorage;
      }
      case STORAGE_TYPE.sessionStorage:
        return SessionStorage;
      default:
        return MemoryStorage;
    }
  }

  /**
   * 设置状态缓存
   * @param {String} key 唯一性的识别码（一般对应到后端接口名或者 mutation-type）
   * @param {Object} state 需要存储的状态数据
   * @param {String} [storageType] 存储引擎类型，若不设置默认以 sessionStorage 引擎
   * @returns {*|void}
   */
  setState(key, state, storageType = STORAGE_TYPE.sessionStorage) {
    const s = this.validStorage(storageType);
    const k = this.realKey(key);

    return s.setItem(k, state);
  }

  /**
   * 取出状态缓存
   * @param {String} key 唯一性的识别码（一般对应到后端接口名或者 mutation-type）
   * @param {String} [storageType] 存储引擎类型，若不设置默认以 sessionStorage 引擎
   * @param {Object} [value] 缺省值。前者无值时的替代方案
   * @returns {*}
   */
  getState(key, storageType, value = null) {
    const s = this.validStorage(storageType);
    const k = this.realKey(key);
    const r = s.getItem(k);

    return r ? r : value;
  }

  /**
   * 移除指定状态缓存
   * @param {String} key 唯一性的识别码（一般对应到后端接口名或者 mutation-type）
   * @param {String} [storageType] 存储引擎类型，若不设置默认以 sessionStorage 引擎
   * @returns {void}
   */
  removeState(key, storageType) {
    const s = this.validStorage(storageType);
    const k = this.realKey(key);

    s.removeItem(k);
  }

  /**
   * 经过处理后的 key
   * @param {String} key 唯一性的识别码（一般对应到后端接口名或者 mutation-type）
   * @returns {string}
   */
  realKey(key) {
    return `${key}@${this.unique}`;
  }
}

export default PersistedState;
