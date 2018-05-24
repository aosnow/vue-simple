/**
 * HTTP 请求错误信息集合
 */
declare const HttpErrorInfo:{

  default:string;
  network:string;
  aborted:string;
  timeout:string;

  // 3xx: 重定向，需要进一步的操作以完成请求
  301:string,
  302:string,
  303:string,
  304:string,
  305:string,
  306:string,
  307:string,

  // 4xx: 客户端错误
  400:string,
  401:string,
  402:string,
  403:string,
  404:string,
  405:string,

  406:string,
  407:string,
  408:string,
  409:string,
  410:string,

  411:string,
  412:string,
  413:string,
  414:string,
  415:string,

  416:string,
  417:string,

  // 5xx: 服务器错误
  500:string,
  501:string,
  502:string,
  503:string,
  504:string,
  505:string

  /**
   * 将新的提示错误描述信息覆盖旧的信息
   * @param {Object} options 新的错误信息配置，如{404:'页面未找到'}
   * @param options
   */
  merge( options:any ):void;
};
