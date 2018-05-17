import _Map from 'babel-runtime/core-js/map';
import STORAGE_TYPE from '../storageType';

/**
 * map memory 存储引擎
 * <p>作为不支持 sessionstorage 的降级支持方案</p>
 */
export default {
  type: STORAGE_TYPE.memory,
  storage: new _Map(),
  getItem: function getItem(key) {
    return this.storage.get(key);
  },
  setItem: function setItem(key, value) {
    this.storage.set(key, value);
  },
  removeItem: function removeItem(key) {
    this.storage.delete(key);
  },
  clear: function clear() {
    this.storage.clear();
  }
};