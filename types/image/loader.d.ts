// ------------------------------------------------------------------------------
//
// index.d
// author: 喵大斯( h5devs.com/h5devs.net )
// created: 2018/7/5
// copyright (c) 2015 喵大斯( aosnow@yeah.net )
//
// ------------------------------------------------------------------------------

/**
 * 将图片元素通过 canvas 读取 base64 编码
 * @param {HTMLImageElement} imageElement
 * @param {Number} [width] 新的宽度（不设置直接使用图片元素宽度）
 * @param {Number} [height] 新的高度（不设置直接使用图片元素高度）
 * @returns {string}
 */
declare function getBase64FromImage(imageElement, width, height);

/**
 * 将远程图片读取成 base64 编码
 * @param {String} url 图片地址
 * @returns {Promise}
 */
declare function loadImageBase64(url):Promise;

/**
 * 使用 base64 编码进行图片下载
 * @param {String} base64 图片的 Base64 编码
 * @param {String} [fullname] 文件名称（不需要扩展名）
 */
declare function downloadImageBase64(base64, fullname);

export { loadImageBase64, getBase64FromImage, downloadImageBase64 };
