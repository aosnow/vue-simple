import { AxiosInstance, AxiosPromise, AxiosRequestConfig } from "axios";
import { Vue } from "vue/types/vue";
// import { Interceptor } from "./interceptor";

/**
 * 请求地址类型
 */
export type RequestUrl = string | { getway:string, api:string };

export declare interface ServerConfig
{
  invoke_source:number;
}

export declare interface ApiConfig
{
  srv:ServerConfig;
  local:AxiosRequestConfig;
}

export declare interface Api
{
  /**
   * 后端接口需求 token 验证串
   * @type {string|null}
   */
  token:string;

  // Axios 实例
  // axios:AxiosInstance;

  // 缓存配置：来源于初始化设置
  // conf:ApiConfig;

  // 拦截器实例
  // interceptor:Interceptor;

  /**
   * 初始化 Axios 实例
   * @param conf
   */
  init( conf:ApiConfig ):void;

  /**
   * 通过 get 方式请求数据
   * @param {string|{ getway:string, api: string }} url 请求地址参数；getway为网关名称，api为接口名（查看后端接口文档列表）
   * @param data 需要提交的参数数据
   * @returns {Promise}
   */
  get( url:RequestUrl, data:any ):AxiosPromise;

  /**
   * 通过 delete 方式请求数据
   * @param {string|{ getway:string, api: string }} url 请求地址参数；getway为网关名称，api为接口名（查看后端接口文档列表）
   * @param data 需要提交的参数数据
   * @returns {Promise}
   */
  delete( url:RequestUrl, data:any ):AxiosPromise;

  /**
   * 通过 get 方式提交参数并请求数据
   * @param {string|{ getway:string, api: string }} url 请求地址参数；getway为网关名称，api为接口名（查看后端接口文档列表）
   * @param data 需要提交的参数数据
   * @returns {Promise}
   */
  post( url:RequestUrl, data:any ):AxiosPromise;

  /**
   * 通过 put 方式提交参数并请求数据
   * @param {string|{ getway:string, api: string }} url 请求地址参数；getway为网关名称，api为接口名（查看后端接口文档列表）
   * @param data 需要提交的参数数据
   * @returns {Promise}
   */
  put( url:RequestUrl, data:any ):AxiosPromise;

  /**
   * 发送 axios 请求
   * @param {{ method:String, url:String, params?:{}, data?:{} }} conf 单个请求配置如“{ method:'', url:'', params:{}, data:{} }”
   * @returns {Promise}
   */
  request( conf:AxiosRequestConfig ):AxiosPromise;

  /**
   * 取消请求（message 参数是可选的）
   * @param {String} [message]
   */
  cancel(message?:string):void;

  /**
   * 执行指请求操作
   * @param requests 多个请求对象的数组，可以通过 axios.get 或者 axios.post 进行构建
   * @returns {Promise|null} 当参数不合法时，将返回 null，反之返回批量逻辑的 Promise 对象
   */
  all( requests:[ AxiosInstance ] ):AxiosPromise;

  /**
   * 注册并启用指定的所有请求拦截器
   * @param {Object} conf 拦截器集合
   */
  register( conf ):void;

  /**
   * 注册拦截器
   * @param {string} type 拦截器类型：request|response
   * @param {function} interceptor 拦截器
   * @param {function} [error] 该拦截器所对应的错误处理函数，若不设置则使用默认错误处理函数
   */
  interceptor( type, interceptor, error ):void;

  /**
   * 将拦截器开始启动作用在指定的 Axios 实例上
   * @param {string} [type] 拦截器类型：request|response，若缺省则运用所有拦截器到指定 axios 实例上
   */
  flush( type ):void;

  /**
   * 格式化 URL 地址
   * @param {string} url 请求地址参数
   * @returns {string}
   */
  slash( url:string ):string;

  /**
   * 生成请求时所需唯一标识码（out_request_no）
   * @returns {string}
   * @return
   */
  hash():string;
}

export interface ApiInstaller
{
  /**
   * 安装 API 通信插件
   * @param {Vue} Vue Vue全局对象（window.Vue）
   * @param {{srv,local}} config 关于 axios 的默认配置
   */
  ( Vue:Vue, config:AxiosRequestConfig ):any;
}

export interface Vue{
  // Api 工具类实例
  readonly $api;
}

