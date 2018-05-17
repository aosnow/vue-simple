// --------------------------------------------------
// 接口规范相关
// --------------------------------------------------

const SrvConf = {
  invoke_source: 2200
};

// --------------------------------------------------
// 请求配置相关
// --------------------------------------------------

// 开发模式（开发时为 true）
const DEBUG = process.env.NODE_ENV === 'development';

/**
 * 服务器项目名称(仅开发阶段有效)
 * <p>该参数将作为请求时的默认前缀</p>
 * <p>当请求远程API时，将通过 vue-cli 中的 proxyTable 配置进行链接代理处理</p>
 * @type {string}
 */
const serverName = DEBUG ? '/api' : '';

/**
 * API地址
 * <p>本地调试时通过 vue-cli 中的 proxyTable 配置来解决跨域问题。</p>
 * <p>正式发布环境通过网址前缀来进行API访问。</p>
 * @type {string}
 */
const serverPath = DEBUG ? '' : 'http://172.16.8.6:8080';

/**
 * 该配置主要用于初始化 axios 请求参数，可参照 axios 的默认配置进行设置
 */
const LocalConf = {
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: serverPath + serverName,

  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求会话超过 `timeout` 的时间，请求将被中断
  timeout: 10000,

  // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json',

  // 表单编码方式
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
};

export { LocalConf, SrvConf };
