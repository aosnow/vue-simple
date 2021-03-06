import { Http } from '../../packages';
import router from '../router';

export default [
  // 注册 request 拦截器范例
  {
    type: 'request',
    interceptor(config) {
      // console.warn('request.interceptor:', config);

      // 必须返回原配置，否则请求将意外中断
      return config;
    },
    error: null // 缺省参数，使用默认错误处理函数
  },

  // 注册 response 拦截器范例
  {
    type: 'response',
    interceptor(response) {
      // console.warn('response.interceptor:', response);

      if (response.data && parseInt(response.data.code, 10) === 40003) {
        router.push({ path: '/login' });
      }

      // 必须返回原数据，否则正常请求之处无法取得该返回数据
      return response;
    },
    error(error) {
      const errInfo = Http.errorInfo(error);
      console.warn('Http Error Info:', error, errInfo);

      // 若错误为“请求已取消”，则无须向下传递到具体的请求catch中处理
      if (!/^cancel/i.test(error.toString())) {
        // return error;
      }

    }
  }
];
