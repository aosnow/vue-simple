import HttpErrorInfo from './HttpErrorInfo';

const Http = {
  /**
   * 根据 HTTP 错误对象分析对应的错误详细内容
   * @param {{request,response:{status}}} error
   * @returns {*}
   */
  errorInfo(error) {
    const type = typeof error;

    // err.response.status
    switch (type) {
      case 'undefined': {
        return HttpErrorInfo.network;
      }
      case 'object': {
        if (error.response && error.response.status && HttpErrorInfo[error.response.status]) {
          return `[${error.response.status}] ${HttpErrorInfo[error.response.status]}`;
        }
        else if (error instanceof Error) {
          if (/^timeout of/i.test(error.message)) {
            return HttpErrorInfo.timeout;
          }
          else if (/^network/i.test(error.message)) {
            return HttpErrorInfo.network;
          }
        }
        else if (/^cancel/i.test(error.toString())) {
          return error.message || HttpErrorInfo.cancel;
        }

        return HttpErrorInfo.default;
      }
      case 'string': {
        return error;
      }
      default: {
        return HttpErrorInfo.default;
      }
    }
  }
};

export { Http, HttpErrorInfo };
