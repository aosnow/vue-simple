import _JSON$stringify from 'babel-runtime/core-js/json/stringify';
import STORAGE_TYPE from '../storageType';

/**
 * sessionStorage 存储引擎
 */
export default {
  type: STORAGE_TYPE.sessionStorage,
  storage: sessionStorage || window.sessionStorage,
  getItem: function getItem(key) {
    var r = this.storage.getItem(key);
    r = r ? JSON.parse(r) : r;
    return r;
  },
  setItem: function setItem(key, value) {
    value = _JSON$stringify(value);
    this.storage.setItem(key, value);
  },
  removeItem: function removeItem(key) {
    this.storage.removeItem(key);
  },
  clear: function clear() {
    this.storage.clear();
  }
};