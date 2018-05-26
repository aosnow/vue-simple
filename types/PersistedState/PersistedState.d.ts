import Vuex from 'vuex';

/**
 * 持久状态维护管理器
 */
declare interface PersistedState
{

  /**
   * 构建持久化状态管理器实例
   * @param {{store:Vuex, expire:Number, storage?:StateStorage}} options
   */
  new ( options:any );

  /**
   * 唯一识别码
   * <p>针对不同的应用起到“作用域”的作用，以避免应用与应用之间的数据混乱问题</p>
   */
  unique:string;

  /**
   * 检测获取最终可用的 storage 引擎
   * @param {String} [storageType] 存储引擎类型
   * @returns {*|{type, storage, getItem, setItem, removeItem, clear}|Map|Storage|StorageEvent|boolean}
   */
  validStorage( storageType?:string ):void;

  /**
   * 设置状态缓存
   * @param {String} key 唯一性的识别码（一般对应到后端接口名或者 mutation-type）
   * @param {Object} state 需要存储的状态数据
   * @param {String} [storageType] 存储引擎类型，若不设置默认以 sessionStorage 引擎
   * @returns {*|void}
   */
  setState( key:string, state:any, storageType?:string ):void;

  /**
   * 取出状态缓存
   * @param {String} key 唯一性的识别码（一般对应到后端接口名或者 mutation-type）
   * @param {String} [storageType] 存储引擎类型，若不设置默认以 sessionStorage 引擎
   * @param {Object} [value] 缺省值。前者无值时的替代方案
   * @returns {*}
   */
  getState( key:string, storageType?:string, value?:any ):any;

  /**
   * 移除指定状态缓存
   * @param {String} key 唯一性的识别码（一般对应到后端接口名或者 mutation-type）
   * @param {String} [storageType] 存储引擎类型，若不设置默认以 sessionStorage 引擎
   * @returns {void}
   */
  removeState( key:string, storageType?:string ):any;

  /**
   * 解析真实 key
   * @param key
   * @return {String}
   */
  realKey( key:string ):string;
}

export default PersistedState;
