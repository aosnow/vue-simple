// --------------------------------------------------------------------------
//
// Interceptor Define
//
// --------------------------------------------------------------------------

/**
 * 请求错误默认处理函数
 * @param error
 */
const DefaultError = error => {
  console.error(error);
};

/**
 * Axios 拦截器代理器
 */
class Interceptor {
  _axios;
  _interceptors = [];
  _unuseInterceptors = [];

  /**
   * 初始化
   * @param {AxiosInstance} axios 实例
   */
  constructor(axios) {
    this._axios = axios;
  }

  /**
   * 检测是否已经注册过指定拦截器函数
   * @param {string} type 拦截器类型：request|response
   * @param {function} interceptor 拦截器
   * @return {boolean}
   */
  has(type, interceptor) {
    const target = [...this._interceptors, ...this._unuseInterceptors];

    for (let i = 0; i < target.length; i++) {
      const item = target[i];
      if (item.interceptor === interceptor && item.type === type) return true;
    }

    return false;
  }

  /**
   * 注册拦截器
   * @param {string} type 拦截器类型：request|response
   * @param {function} interceptor 拦截器
   * @param {function} [error] 该拦截器所对应的错误处理函数，若不设置则使用默认错误处理函数
   */
  register(type, interceptor, error) {
    if (!this.has(type, interceptor)) {
      this._unuseInterceptors.push({
        id: -1, type, interceptor, error
      });
    }
  }

  /**
   * 启用已注册的拦截器
   * @param {string} [type] 需要启用的类型，若缺省则启用所有已注册拦截器
   */
  flush(type) {
    let target = this._unuseInterceptors;

    if (/^(request|response)$/i.test(type)) {
      target = target.filter(i => i.type === type);
    }

    while (target.length > 0) {
      const item = target.shift();

      item.id = this._axios.interceptors[item.type].use(
        item.interceptor,
        item.error || DefaultError
      );
      this._interceptors.push(item);
    }
  }
}

Interceptor.request = 'request';
Interceptor.response = 'response';

export { Interceptor, DefaultError };
