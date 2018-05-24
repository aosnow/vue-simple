/**
 *
 * @return
 */
declare function toString():string;

/**
 * 合并多个对象属性并返回合并后的新对象
 * @param args 需要合并的对象，不能是 null 或 undefined
 * @returns {*}
 */
declare function merge( ...args:Object[] ):void;

/**
 * 确定参数是否为 Array 数组类型
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
declare function isArray( val:any ):boolean;

/**
 * 确定参数是否为 ArrayBuffer 类型
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
declare function isArrayBuffer( val:any ):boolean;

/**
 * 确定参数是否为 FormData 表单数据对象类型
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
declare function isFormData( val:any ):boolean;

/**
 * 确定参数是否为 ArrayBuffer 的 view 类型
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
declare function isArrayBufferView( val:any ):any;

/**
 * 确定参数是否为 String 字符串类型
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
declare function isString( val:any ):boolean;

/**
 * 确定参数是否为 Number 数值类型
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
declare function isNumber( val:any ):boolean;

/**
 * 确定参数是否为 undefined 类型
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
declare function isUndefined( val:any ):boolean;

/**
 * 确定参数是否为 Object 对象类型
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
declare function isObject( val:any ):boolean;

/**
 * 确定参数是否为 Date 日期类型
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
declare function isDate( val:any ):boolean;

/**
 * 确定参数是否为 File 文件对象类型
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
declare function isFile( val:any ):boolean;

/**
 * 确定参数是否为 Blob 类型
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
declare function isBlob( val:any ):boolean;

/**
 * 确定参数是否为 Function 函数类型
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
declare function isFunction( val:any ):boolean;

/**
 * 确定参数是否为 Stream 对象
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
declare function isStream( val:any ):boolean;

/**
 * 确定参数值是否为 URLSearchParams 对象
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
declare function isURLSearchParams( val:any ):boolean;

/**
 * 去除字符串前后的空白字符
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
declare function trim( str:string ):string;

/**
 * 确定当前应用是否运行在标准浏览器环境中
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 *
 * @returns {boolean}
 */
declare function isStandardBrowserEnv():boolean;

export {
  isArray,
  isArrayBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isObject,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isFunction,
  isStream,
  isURLSearchParams,
  isStandardBrowserEnv,
  trim,
  merge
};
