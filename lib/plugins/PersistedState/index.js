import _Promise from 'babel-runtime/core-js/promise';
import PersistedState from './PersistedState';
import STORAGE_TYPE from './storageType';

// 持久化缓存处理器实例
var $persistedState = new PersistedState();

/**
 * 只有注册的 key 才会进行缓存
 */
var PersistedConfig = {
  /**
   * 注册需要进行持久化存储的 MutationType 配置
   * @param {String} type 必须是已经定义的 mutation 名，若使用了 Module，需要指定完整包含 Module 和 type 的值，如“info/save”
   * @param {String} [storage] 存储引擎类型：localStorage,sessionStorage,memory。推荐通过 STORAGE_TYPE 进行引用取得
   * @param {Number} [expire] 数据保持的时间，单位秒，过期后将重新请求新数据（只对 LocalStorage 支持，目前尚未开发）
   */
  add: function add(_ref) {
    var type = _ref.type,
        storage = _ref.storage,
        expire = _ref.expire;

    if (!type) throw new Error('Invalid persistent state configuration');
    this[type] = { type: type, storage: storage, expire: expire || 0 };
  },


  /**
   * 通过 add() 方法进行批量注册
   * @param {Array<{ type, storage?, expire? }>} confs 配置集合
   */
  batch: function batch(confs) {
    var _this = this;

    if (Array.isArray(confs)) {
      confs.forEach(function (conf) {
        _this.add(conf);
      });
    }
  },


  /**
   * 检测指定的 MutationType 是否已经注册
   * @param mutationType
   * @returns {Boolean}
   */
  has: function has(mutationType) {
    return this[mutationType];
  },

  /**
   * 移除已经注册的 MutationType
   * <p>移除后，将直接使用请求取数据，从而忽略缓存</p>
   * @param mutationType
   */
  remove: function remove(mutationType) {
    if (this.has(mutationType)) {
      delete this[mutationType];
    }
  }
};

/**
 * 检测是否过期（单位：秒）
 * @param {Number} timestamp 旧的时间戳
 * @param {Number} expire 过期时间
 * @returns {boolean}
 */
var expired = function expired(timestamp, expire) {
  var curTimestamp = new Date().getTime() * 0.001; // 转换成秒
  return curTimestamp - timestamp > expire;
};

/**
 * 从指定字符串类型的 type 值中解析是否包含 module
 * @param {String} type 指定 Mutation 类型值
 * @returns {{module:String, type:String}}
 */
var parseType = function parseType(type) {
  var mt = type.split(/\//ig);
  var realType = mt.pop();
  var module = mt.length > 0 ? mt.join('/') : '';

  return { module: module, type: realType };
};

/**
 * 统一拦截和处理 Action 的数据请求，决定是使用缓存还是直接请求
 * @param commit
 * @param {String} type 指定 Mutation 的名字
 * @param {Function<Promise>} getData 执行请求数据的 Promise 包装函数
 * @param {Boolean} force 是否强制重新请求，以便于重写新的数据
 * @returns {Promise}
 */
var PersistedAction = function PersistedAction(_ref2, _ref3) {
  var commit = _ref2.commit;
  var type = _ref3.type,
      getData = _ref3.getData,
      force = _ref3.force;
  return new _Promise(function (resolve, reject) {
    var conf = PersistedConfig[type];

    // 若未注册则提示错误中断程序执行
    if (!conf) {
      throw new Error('Unregistered persistent status configuration, please register with \'PersistedConfig.add()\' or \'PersistedConfig.batch()\'');
    }

    // 尝试取缓存数据
    var cacheData = $persistedState.getState(conf.type, conf.storage);
    var types = parseType(conf.type);

    // 检测数据缓存是否过期
    // 如果之前存放数据时设置了时间戳，且配置了过期时间，则检测过期逻辑
    if (cacheData && cacheData.timestamp && typeof conf.expire === 'number' && conf.expire > 0 && expired(cacheData.timestamp, conf.expire)) {
      $persistedState.removeState(conf.type, conf.storage);
      cacheData = null;
    }

    if (cacheData && !force) {
      console.warn('使用缓存数据进行 commit.', cacheData.payload);
      commit(types.type, cacheData.payload);
      resolve(cacheData.payload);
    } else {
      getData().then(function (data) {
        console.warn('请求远程数据进行 commit.', data);
        commit(types.type, data);
        resolve(data);
      }).catch(function (error) {
        reject(error);
      });
    }
  });
};

/**
 * Vuex 持久化插件
 * @param store
 * @constructor
 */
var PersistedPlugin = function PersistedPlugin(store) {
  // 存数据
  store.subscribe(function (_ref4) {
    var type = _ref4.type,
        payload = _ref4.payload;

    var conf = PersistedConfig[type];

    if (conf && conf.type) {
      // $persistedState.setState(conf.type, payload, conf.storage, conf.expire);
      $persistedState.setState(conf.type, { payload: payload, timestamp: new Date().getTime() * 0.001 }, conf.storage);
    }
  });
};

export { PersistedState, PersistedAction, PersistedPlugin, PersistedConfig, STORAGE_TYPE };