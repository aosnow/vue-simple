import * as utils from './utils';

/**
 * 检测指定的 URL 是否为绝对路径
 * @param url
 * @returns {boolean}
 */
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+-.]*:)?\/\//i.test(url);
}

function encode(val) {
  let r = encodeURIComponent(val);

  r = r.replace(/%40/gi, '@');
  r = r.replace(/%3A/gi, ':');
  r = r.replace(/%24/g, '$');
  r = r.replace(/%2C/gi, ',');
  r = r.replace(/%20/g, '+');
  r = r.replace(/%5B/gi, '[');
  r = r.replace(/%5D/gi, ']');

  return r;
}

/**
 * 使用指定 params 集合生成指定的带参数的完整 URL 地址
 *
 * @param {String} url The base of the url (e.g., http://www.google.com)
 * @param {Object} [params] The params to be appended
 * @param {Function} [paramsSerializer]
 * @returns {String} The formatted url
 */
function buildURL(url, params, paramsSerializer) {
  /* eslint no-param-reassign:0 */
  if (!params) {
    return url;
  }

  let serializedParams;

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  }
  else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  }
  else {
    const parts = [];

    params.forEach((val, key) => {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key += '[]';
      }
      else {
        val = [val];
      }

      val.forEach(v => {
        if (utils.isDate(v)) {
          v = v.toISOString();
        }
        else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}

export { isAbsoluteURL, buildURL };
