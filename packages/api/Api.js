import Axios from 'axios';
import { hash } from '../utils/hash';
import { Interceptor } from './interceptor';

class Api {
  _axios = null;
  _conf = null;
  _interceptor = null;

  _CancelToken = Axios.CancelToken;
  _source = this._CancelToken.source();

  /**
   * 后端接口需求 token 验证串
   * @type {string|null}
   */
  token = null;

  /**
   * 构建 API 通信模块实例
   * @param {{local,srv,interceptors}} config 配置信息
   */
  constructor(config) {
    // 缓存配置数据
    this._conf = config;

    // 创建实例成员
    this._axios = Axios.create(this._conf.local);
    this._interceptor = new Interceptor(this._axios);

    // 注册拦截器
    this.register(config.interceptors);
  }

  /**
   * 通过 get 方式请求数据
   * @param {string|{ getway:string, api: string }} url 请求地址参数；getway为网关名称，api为接口名（查看后端接口文档列表）
   * @param {Object} data 需要提交的参数数据
   * @param {Object} [conf] 附加配置参数（可覆盖默认配置，如覆盖 responseType）
   * @returns {Promise}
   */
  get(url, data = null, conf = null) {
    return this.request({ method: 'get', url, params: data, ...conf });
  }

  /**
   * 通过 delete 方式请求数据
   * @param {string|{ getway:string, api: string }} url 请求地址参数；getway为网关名称，api为接口名（查看后端接口文档列表）
   * @param {Object} data 需要提交的参数数据
   * @param {Object} [conf] 附加配置参数（可覆盖默认配置，如覆盖 responseType）
   * @returns {Promise}
   */
  delete(url, data = null, conf = null) {
    return this.request({ method: 'delete', url, params: data, ...conf });
  }

  /**
   * 通过 get 方式提交参数并请求数据
   * @param {string|{ getway:string, api: string }} url 请求地址参数；getway为网关名称，api为接口名（查看后端接口文档列表）
   * @param {Object} data 需要提交的参数数据
   * @param {Object} [conf] 附加配置参数（可覆盖默认配置，如覆盖 responseType）
   * @returns {Promise}
   */
  post(url, data = null, conf = null) {
    return this.request({ method: 'post', url, data, ...conf });
  }

  /**
   * 通过 put 方式提交参数并请求数据
   * @param {string|{ getway:string, api: string }} url 请求地址参数；getway为网关名称，api为接口名（查看后端接口文档列表）
   * @param {Object} data 需要提交的参数数据
   * @param {Object} [conf] 附加配置参数（可覆盖默认配置，如覆盖 responseType）
   * @returns {Promise}
   */
  put(url, data = null, conf = null) {
    return this.request({ method: 'put', url, data, ...conf });
  }

  /**
   * 发送 axios 请求
   * @param {{ method:String, url:String, params?:{}, data?:{}, cancelToken }} conf 单个请求配置如“{ method:'', url:'', params:{}, data:{} }”
   * @returns {Promise}
   */
  request(conf) {
    if (!conf.method) {
      throw new Error('conf.method must be setup, but it\'s not define now.');
    }

    if (!conf.url) {
      throw new Error('conf.url must be setup, but it\'s not define now.');
    }

    // 处理 get 参数
    // 调用 request 之前存入 confg.params 即可

    // 统一请求 API 接口地址规范
    // 网关地址 + 二级子系统地址 + 接口地址
    // 172.16.8.6:8080/user/login
    if (typeof conf.url === 'object') {
      const { getway, api } = conf.url;

      if (!getway || !api) {
        throw new Error('conf.url is incorrect, and the \'getway\' and \'api\' property must be included.');
      }

      conf.url = `${Api.slash(getway)}${Api.slash(api)}`;
    }

    // 处理请求地址以 '/' 开头
    conf.url = Api.slash(conf.url);

    // 通过URL附加参数禁用浏览器缓存特性
    if (this._conf['noCache']) {
      conf.params = conf.params || {};
      conf.params['timestamp'] = `${hash()}`;
    }

    // `data` 是作为请求主体被发送的数据
    // 必须是以下类型之一：
    // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
    // - 浏览器专属：FormData, File, Blob
    // - Node 专属： Stream
    if (conf.data && typeof conf.data !== 'string') {
      switch (conf.data.toString()) {
        case '[object FormData]': {
          break;
        }
        default: {
          // 默认情况下将整个 Request Body 转换成 JSON 结构
          const contentType = this._axios.defaults.headers['Content-Type'];

          if (/^application\/json/ig.test(contentType)) {
            conf.data = JSON.stringify(conf.data);
          }
        }
      }
    }

    // token 验证串
    this._axios.defaults.headers['token'] = this.token || sessionStorage.getItem('token');
    this._axios.defaults.headers['invoke_source'] = this._conf.srv.invoke_source;
    this._axios.defaults.headers['out_request_no'] = hash();

    // cancelToken: source.token
    conf.cancelToken = this._source.token;

    // return this._axios.request({
    //   method: conf.method,
    //   url: conf.url,
    //   ...conf
    // });
    return new Promise((resolve, reject) => {
      this._axios.request({
        method: conf.method,
        url: conf.url,
        ...conf
      }).then(response => {
        if (response && response.data) {
          resolve(response);
        }
        else {
          // 若使用 response 拦截器 return 的结果为有效值，如 Error 对象，则抛出给 catch() 分支进行捕获
          (response !== undefined && response !== null) && reject(response);
        }
      }).catch(error => {
        reject(error);
      });
    });
  }

  /**
   * 取消请求（message 参数是可选的）
   * @param {String} [message]
   */
  cancel(message) {
    this._source.cancel(message);

    // 重新生成新的 token，否则后续请求将被继续直接取消
    this._source = this._CancelToken.source();
  }

  /**
   * 注册并启用指定的所有请求拦截器
   * @param {Object} conf 拦截器集合
   */
  register(conf) {
    if (conf) {
      Object.values(conf).forEach(item => {
        if (Array.isArray(item)) {
          item.forEach(the => {
            const { type, interceptor, error } = the;
            this.interceptor(type, interceptor, error);
          });
        }
        else if (item.interceptor) {
          const { type, interceptor, error } = item;
          this.interceptor(type, interceptor, error);
        }
      });

      this.flush();
    }
  }

  /**
   * 注册拦截器
   * @param {string} type 拦截器类型：request|response
   * @param {function} interceptor 拦截器
   * @param {function} [error] 该拦截器所对应的错误处理函数，若不设置则使用默认错误处理函数
   */
  interceptor(type, interceptor, error) {
    this._interceptor.register(type, interceptor, error);
  }

  /**
   * 启用已注册的拦截器
   * @param {string} [type] 需要启用的类型，若缺省则启用所有已注册拦截器
   */
  flush(type) {
    this._interceptor.flush(type);
  }

  /**
   * 格式化 URL 地址
   * @param {string} url 请求地址参数
   * @returns {string}
   */
  static slash(url) {
    // 首字符必须以“/”开头
    return `/${url}`.replace(/^[/]{2,}/i, '/');
  }
}

/**
 * 执行指请求操作
 * @param requests 多个请求对象的数组，可以通过 vm.$axios.get 或者 vm.$axios.post 进行构建
 * @returns {Promise|null} 当参数不合法时，将返回 null，反之返回批量逻辑的 Promise 对象
 */
Api.prototype.all = requests => {
  if (!Array.isArray(requests)) {
    throw new Error('axios.all: the parameter error in this method');
  }
  return Axios.all(requests);
};

/**
 * 安装 API 通信插件
 * @param {Vue} Vue Vue全局对象（window.Vue）
 * @param {{srv,local}} config 关于 axios 的默认配置
 */
function ApiInstaller(Vue, config) {
  Vue.$api = new Api(config);
}

export { Api, ApiInstaller };
