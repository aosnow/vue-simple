// ------------------------------------------------------------------------------
//
// base64.d
// author: 喵大斯( h5devs.com/h5devs.net )
// created: 2018/7/5
// copyright (c) 2015 喵大斯( aosnow@yeah.net )
//
// ------------------------------------------------------------------------------

/**
 * 将图片 Base64 转换成 Blob 对象
 * @param {String} base64
 * @returns {Blob}
 */
declare function base64toBlob( base64:string );

/**
 * 将图片 Base64 转换成 Blob 对象
 * @param {String} base64
 * @param {String} [filename]
 * @returns {File}
 */
declare function base64toFile( base64:string, filename?:string );

/**
 * 检测指定的字符串是否为 Base64 图片编码
 * @param {String} value Base64 图片编码
 */
function isBase64DataURL(value:string)

export { base64toBlob, base64toFile, isBase64DataURL };
