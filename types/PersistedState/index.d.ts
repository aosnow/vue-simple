// ------------------------------------------------------------------------------
//
// index.d
// author: 喵大斯( h5devs.com/h5devs.net )
// created: 2018/5/20
// copyright (c) 2015 喵大斯( aosnow@yeah.net )
//
// ------------------------------------------------------------------------------

import PersistedState from './PersistedState';
import STORAGE_TYPE from './storageType';

/**
 * 只有注册的 key 才会进行缓存
 */
declare namespace PersistedConfig
{

  /**
   * 注册需要进行持久化存储的 MutationType 配置
   * @param {String} type 必须是已经定义的 mutation 名，若使用了 Module，需要指定完整包含 Module 和 type 的值，如“info/save”
   * @param {String} [storage] 存储引擎类型：localStorage,sessionStorage,memory。推荐通过 STORAGE_TYPE 进行引用取得
   * @param {Number} [expire] 数据保持的时间，单位秒，过期后将重新请求新数据（只对 LocalStorage 支持，目前尚未开发）
   */
  function add( { type, storage, expire } ):void;

  /**
   * 通过 add() 方法进行批量注册
   * @param {Array<{ type, storage?, expire? }>} confs 配置集合
   */
  function batch( confs:any ):void;

  /**
   * 检测指定的 MutationType 是否已经注册
   * @param mutationType
   * @returns {Boolean}
   */
  function has( mutationType:any ):Boolean;

  /**
   * 移除已经注册的 MutationType
   * <p>移除后，将直接使用请求取数据，从而忽略缓存</p>
   */
  function remove( mutationType:any ):void;
}

/**
 * 检测是否过期（单位：秒）
 * @param {Number} timestamp 旧的时间戳
 * @param {Number} expire 过期时间
 * @returns {boolean}
 */
declare function expired( timestamp:number, expire:number ):boolean;

/**
 * 从指定字符串类型的 type 值中解析是否包含 module
 * @param {String} type 指定 Mutation 类型值
 * @returns {{module:String, type:String}}
 */
declare function parseType( type:string ):{ module:String, type:String };

/**
 * 统一拦截和处理 Action 的数据请求，决定是使用缓存还是直接请求
 * @param commit
 * @param {String} type 指定 Mutation 的名字
 * @param {Function<Promise>} getData 执行请求数据的 Promise 包装函数
 * @param {Boolean} force 是否强制重新请求，以便于重写新的数据
 * @returns {Promise}
 */
declare function PersistedAction( { commit }, { type, getData, force } ):Promise;

/**
 * Vuex 持久化插件
 * @param store
 */
declare function PersistedPlugin( store:any ):void;

/**
 * 针对当前应用设置唯一识别码
 * <p>针对不同的应用起到“作用域”的作用，以避免应用与应用之间的数据混乱问题</p>
 * @param {string} code 唯一码（长度必须大于5位，且不能是全字母或全数字），如“F@K%$JD&LF”
 */
declare function setUnique( code:string ):void;

/**
 * 持久化数据清除器
 */
declare namespace PersistedClear
{
  function remove( type:any ):void;
}

/**
 * 主动恢复持久化数据到 vuex
 * <p>前提：必须先定义 vuex，且使用 PersistedConfig 进行注册缓存的 mutation 配置。</p>
 */
declare namespace PersistedRestore
{
  function restore( store:any, type:any ):void;
}

export {
  PersistedState,
  setUnique,
  PersistedClear,
  PersistedRestore,
  PersistedAction,
  PersistedPlugin,
  PersistedConfig,
  STORAGE_TYPE
};
