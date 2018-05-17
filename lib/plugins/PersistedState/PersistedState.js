import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import merge from 'deepmerge';
import LocalStorage from './storages/local';
import SessionStorage from './storages/session';
import MemoryStorage from './storages/memory';
import STORAGE_TYPE from './storageType';

/**
 * 持久状态维护管理器
 */

var PersistedState = function () {

  /**
   * 构建实例
   * @param {{expire:Number, store:Vuex, storage?:StateStorage}} [options] 全局配置，可通过私有配置进行覆盖
   */

  // 默认配置
  function PersistedState(options) {
    _classCallCheck(this, PersistedState);

    this._defaultOptions = {
      expire: 0, // 0-永久不超时，直到生命周期结束; 其它值以 秒 为单位判断超时
      storage: STORAGE_TYPE.sessionStorage // 默认缓存存储引擎
    };
    this._options = null;

    this._options = merge({}, this._defaultOptions, options);
  }

  /**
   * 检测获取最终可用的 storage 引擎
   * @param {String} [storageType] 存储引擎类型
   * @returns {*|{type, storage, getItem, setItem, removeItem, clear}|Map|Storage|StorageEvent|boolean}
   */


  // 当前配置


  _createClass(PersistedState, [{
    key: 'validStorage',
    value: function validStorage(storageType) {
      storageType = storageType || this._options.storage || STORAGE_TYPE.memory;

      switch (storageType) {
        case STORAGE_TYPE.localStorage:
          {
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

  }, {
    key: 'setState',
    value: function setState(key, state) {
      var storageType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : STORAGE_TYPE.sessionStorage;

      var s = this.validStorage(storageType);
      var k = PersistedState.realKey(key, s);

      return s.setItem(k, state);
    }

    /**
     * 取出状态缓存
     * @param {String} key 唯一性的识别码（一般对应到后端接口名或者 mutation-type）
     * @param {String} [storageType] 存储引擎类型，若不设置默认以 sessionStorage 引擎
     * @param {Object} [value] 缺省值。前者无值时的替代方案
     * @returns {*}
     */

  }, {
    key: 'getState',
    value: function getState(key, storageType) {
      var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var s = this.validStorage(storageType);
      var k = PersistedState.realKey(key, s);
      var r = s.getItem(k);

      return r ? r : value;
    }

    /**
     * 移除指定状态缓存
     * @param {String} key 唯一性的识别码（一般对应到后端接口名或者 mutation-type）
     * @param {String} [storageType] 存储引擎类型，若不设置默认以 sessionStorage 引擎
     * @returns {void}
     */

  }, {
    key: 'removeState',
    value: function removeState(key, storageType) {
      var s = this.validStorage(storageType);
      var k = PersistedState.realKey(key, s);

      s.removeItem(k);
    }

    /**
     * 经过处理后的 key
     * @param {String} key 唯一性的识别码（一般对应到后端接口名或者 mutation-type）
     * @param {StateStorage} [storage] 存储引擎，若不设置默认以 sessionStorage 引擎
     * @returns {string}
     */

  }], [{
    key: 'realKey',
    value: function realKey(key, storage) {
      return key + '@' + storage.type;
    }
  }]);

  return PersistedState;
}();

export default PersistedState;