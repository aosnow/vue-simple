/**
 * 检测指定的 URL 是否为绝对路径
 * @param url
 * @returns {boolean}
 */
declare function isAbsoluteURL( url:string ):boolean;

/**
 * 使用指定 params 集合生成指定的带参数的完整 URL 地址
 *
 * @param {String} url The base of the url (e.g., http://www.google.com)
 * @param {Object} [params] The params to be appended
 * @param {Function} [paramsSerializer]
 * @returns {String} The formatted url
 */
declare function buildURL( url:string, params?:Object, paramsSerializer?:Function ):string;

export { isAbsoluteURL, buildURL };
