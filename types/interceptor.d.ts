import { AxiosError, AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * Axios 请求错误处理函数
 */
export declare interface AxiosErrorFunction
{
  ( error:AxiosError ):void;
}

/**
 * Axios 请求处理前置拦截处理器函数
 */
export declare interface AxiosRequestInterceptor
{
  ( config:AxiosRequestConfig ):void;
}

export declare interface AxiosInterceptorItem
{
  id:number;
  interceptor:AxiosInterceptor;
  error:AxiosErrorFunction;
}

/**
 * Axios 返回数据前置拦截处理器函数
 */
export declare interface AxiosResponseInterceptor
{
  ( response:AxiosResponse ):void;
}

/**
 * Axios 拦截器函数
 */
export type AxiosInterceptor = AxiosRequestInterceptor | AxiosResponseInterceptor;

/**
 * 默认错误处理函数
 * @param error
 */
export declare var DefaultError:AxiosErrorFunction;

export declare var InterceptorType:{
  REQUEST:string;
  RESPONSE:string;
};

/**
 * 拦截器类型
 */
declare type InterceptorType = 'resquest' | 'response';

/**
 * Axios 拦截器代理器
 */
export declare interface Interceptor
{

  /**
   * 构造新的 Axios 拦截器代理器
   */
  new();

  /**
   * 所有已注册的请求拦截器
   */
  _requestInterceptors:Array<AxiosInterceptorItem>;
  readonly requestInterceptors:Array<AxiosInterceptorItem>;

  /**
   * 所有已注册的响应拦截器
   */
  _responseInterceptors:Array<AxiosInterceptorItem>;
  readonly responseInterceptors:Array<AxiosInterceptorItem>;

  /**
   * 检测是否已经注册过指定拦截器函数
   * @param {String} type 拦截器类型：request|response
   * @param {Function} interceptor 拦截器
   * @returns {boolean}
   */
  has( type:InterceptorType, interceptor:AxiosInterceptor ):boolean;

  /**
   * 注册拦截器
   * @param {String} type 拦截器类型：request|response
   * @param {Function} interceptor 拦截器
   * @param {Function} [error] 该拦截器所对应的错误处理函数，若不设置则使用默认错误处理函数
   */
  register( type:InterceptorType, interceptor:AxiosInterceptor, error?:AxiosErrorFunction ):void;

  /**
   * 启用已注册的拦截器
   * @param {string} [type] 需要启用的类型，若缺省则启用所有已注册拦截器
   */
  flush(type):void;
}


