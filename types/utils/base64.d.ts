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
declare function base64toBlob( base64 );

/**
 * 将图片 Base64 转换成 Blob 对象
 * @param {String} base64
 * @param {String} [filename]
 * @returns {File}
 */
declare function base64toFile( base64, filename );

export { base64toBlob, base64toFile };
