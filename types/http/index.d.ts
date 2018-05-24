/**
 *
 */
declare const Http:{

  /**
   * 根据 HTTP 错误对象分析对应的错误详细内容
   * @param {{request,response:{status}}} error
   * @returns {*}
   * @param error
   * @return
   */
  errorInfo( error:any ):any;
};

export { Http, HttpErrorInfo };
