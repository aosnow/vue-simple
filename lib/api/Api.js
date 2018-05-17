import _Object$values from 'babel-runtime/core-js/object/values';
import _JSON$stringify from 'babel-runtime/core-js/json/stringify';
import _typeof from 'babel-runtime/helpers/typeof';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import Axios from 'axios';
import hashCode from '../utils/hashCode';
import { Interceptor } from './interceptor';

var Api = function () {

  /**
   * 构建 API 通信模块实例
   * @param {{local,srv,interceptors}} config 配置信息
   */
  function Api(config) {
    _classCallCheck(this, Api);

    this._axios = null;
    this._conf = null;
    this._interceptor = null;
    this.token = null;

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


  /**
   * 后端接口需求 token 验证串
   * @type {string|null}
   */


  _createClass(Api, [{
    key: 'get',
    value: function get(url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var conf = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      return this.request(_extends({ method: 'get', url: url, params: data }, conf));
    }

    /**
     * 通过 delete 方式请求数据
     * @param {string|{ getway:string, api: string }} url 请求地址参数；getway为网关名称，api为接口名（查看后端接口文档列表）
     * @param {Object} data 需要提交的参数数据
     * @param {Object} [conf] 附加配置参数（可覆盖默认配置，如覆盖 responseType）
     * @returns {Promise}
     */

  }, {
    key: 'delete',
    value: function _delete(url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var conf = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      return this.request(_extends({ method: 'delete', url: url, params: data }, conf));
    }

    /**
     * 通过 get 方式提交参数并请求数据
     * @param {string|{ getway:string, api: string }} url 请求地址参数；getway为网关名称，api为接口名（查看后端接口文档列表）
     * @param {Object} data 需要提交的参数数据
     * @param {Object} [conf] 附加配置参数（可覆盖默认配置，如覆盖 responseType）
     * @returns {Promise}
     */

  }, {
    key: 'post',
    value: function post(url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var conf = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      return this.request(_extends({ method: 'post', url: url, data: data }, conf));
    }

    /**
     * 通过 put 方式提交参数并请求数据
     * @param {string|{ getway:string, api: string }} url 请求地址参数；getway为网关名称，api为接口名（查看后端接口文档列表）
     * @param {Object} data 需要提交的参数数据
     * @param {Object} [conf] 附加配置参数（可覆盖默认配置，如覆盖 responseType）
     * @returns {Promise}
     */

  }, {
    key: 'put',
    value: function put(url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var conf = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      return this.request(_extends({ method: 'put', url: url, data: data }, conf));
    }

    /**
     * 发送 axios 请求
     * @param {{ method:String, url:String, params?:{}, data?:{} }} conf 单个请求配置如“{ method:'', url:'', params:{}, data:{} }”
     * @returns {Promise}
     */

  }, {
    key: 'request',
    value: function request(conf) {
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
      if (_typeof(conf.url) === 'object') {
        var _conf$url = conf.url,
            getway = _conf$url.getway,
            api = _conf$url.api;


        if (!getway || !api) {
          throw new Error('conf.url is incorrect, and the \'getway\' and \'api\' property must be included.');
        }

        conf.url = '' + Api.slash(getway) + Api.slash(api);
      }

      // 处理请求地址以 '/' 开头
      conf.url = Api.slash(conf.url);

      // 通过URL附加参数禁用浏览器缓存特性
      if (this._conf['noCache']) {
        conf.params = conf.params || {};
        conf.params['timestamp'] = '?' + hashCode();
      }

      // 统一请求 API 接口提交数据结构规范（只处理 POST，GET 交给 params）
      if (conf.data && typeof conf.data !== 'string') {
        // 根据 content-type 进行对应的数据转换
        var contentType = this._axios.defaults.headers['Content-Type'];

        if (/^application\/json/ig.test(contentType)) {
          conf.data = _JSON$stringify(conf.data);
        }
      }

      // token 验证串
      this._axios.defaults.headers['token'] = this.token || sessionStorage.getItem('token');
      this._axios.defaults.headers['invoke_source'] = this._conf.srv.invoke_source;
      this._axios.defaults.headers['out_request_no'] = Api.hash();

      return this._axios.request(_extends({
        method: conf.method,
        url: conf.url
      }, conf));
    }

    /**
     * 执行指请求操作
     * @param requests 多个请求对象的数组，可以通过 vm.$axios.get 或者 vm.$axios.post 进行构建
     * @returns {Promise|null} 当参数不合法时，将返回 null，反之返回批量逻辑的 Promise 对象
     */

  }, {
    key: 'all',
    value: function all(requests) {
      if (!Array.isArray(requests)) {
        throw new Error('axios.all: the parameter error in this method');
      }
      return this._axios.all(requests);
    }

    /**
     * 注册并启用指定的所有请求拦截器
     * @param {Object} conf 拦截器集合
     */

  }, {
    key: 'register',
    value: function register(conf) {
      var _this = this;

      if (conf) {
        _Object$values(conf).forEach(function (item) {
          if (Array.isArray(item)) {
            item.forEach(function (the) {
              var type = the.type,
                  interceptor = the.interceptor,
                  error = the.error;

              _this.interceptor(type, interceptor, error);
            });
          } else if (item.interceptor) {
            var type = item.type,
                interceptor = item.interceptor,
                error = item.error;

            _this.interceptor(type, interceptor, error);
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

  }, {
    key: 'interceptor',
    value: function interceptor(type, _interceptor, error) {
      this._interceptor.register(type, _interceptor, error);
    }

    /**
     * 启用已注册的拦截器
     * @param {string} [type] 需要启用的类型，若缺省则启用所有已注册拦截器
     */

  }, {
    key: 'flush',
    value: function flush(type) {
      this._interceptor.flush(type);
    }

    /**
     * 格式化 URL 地址
     * @param {string} url 请求地址参数
     * @returns {string}
     */

  }], [{
    key: 'slash',
    value: function slash(url) {
      // 首字符必须以“/”开头
      return ('/' + url).replace(/^[/]{2,}/i, '/');
    }

    /**
     * 生成请求时所需唯一标识码（out_request_no）
     * @returns {string}
     */

  }, {
    key: 'hash',
    value: function hash() {
      var date = new Date();
      var p = {
        y: date.getFullYear(),
        m: ('0' + (date.getMonth() + 1)).substr(-2),
        d: ('0' + date.getDate()).substr(-2),
        h: ('0' + date.getHours()).substr(-2),
        i: ('0' + date.getMinutes()).substr(-2),
        s: ('0' + date.getSeconds()).substr(-2)
      };
      return '' + p.y + p.m + p.d + p.h + p.i + p.s + hashCode();
    }
  }]);

  return Api;
}();

/**
 * 安装 API 通信插件
 * @param {Vue} Vue Vue全局对象（window.Vue）
 * @param {{srv,local}} config 关于 axios 的默认配置
 */


function ApiInstaller(Vue, config) {
  Vue['$api'] = new Api(config);
}

export { Api, ApiInstaller };