import merge from 'deepmerge';
import LocalStorage from './storages/local';
import SessionStorage from './storages/session';
import MemoryStorage from './storages/memory';
import STORAGE_TYPE from './storageType';

/**
 * 持久状态维护管理器
 */
class PersistedState {
  // 默认配置
  _defaultOptions = {
    expire: 0, // 0-永久不超时，直到生命周期结束; 其它值以 秒 为单位判断超时
    storage: STORAGE_TYPE.sessionStorage // 默认缓存存储引擎
  };

  // 当前配置
  _options = null;

  /**
   * 构建实例
   * @param {{store:Vuex, expire:Number, storage?:StateStorage}} [options] 全局配置，可通过私有配置进行覆盖
   */
  constructor(options) {
    this._options = merge({}, this._defaultOptions, options);
  }

  /**
   * 检测获取最终可用的 storage 引擎
   * @param {String} [storageType] 存储引擎类型
   * @returns {*|{type, storage, getItem, setItem, removeItem, clear}|Map|Storage|StorageEvent|boolean}
   */
  validStorage(storageType) {
    storageType = storageType || this._options.storage || STORAGE_TYPE.memory;

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
    const k = PersistedState.realKey(key, s);

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
    const k = PersistedState.realKey(key, s);
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
    const k = PersistedState.realKey(key, s);

    s.removeItem(k);
  }

  /**
   * 经过处理后的 key
   * @param {String} key 唯一性的识别码（一般对应到后端接口名或者 mutation-type）
   * @param {StateStorage} [storage] 存储引擎，若不设置默认以 sessionStorage 引擎
   * @returns {string}
   */
  static realKey(key, storage) {
    return `${key}@${storage.type}`;
  }
}

export default PersistedState;
