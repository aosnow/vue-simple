import MIME from '../BlobFile/mimetype';
import { objectIndexOf } from '../utils/object';

/**
 * 将图片 Base64 转换成 Blob 对象
 * @param {String} base64
 * @returns {Blob}
 */
function base64toBlob(base64) {
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

/**
 * 将图片 Base64 转换成 Blob 对象
 * @param {String} base64
 * @param {String} [filename]
 * @returns {File}
 */
function base64toFile(base64, filename) {
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  let fn = filename;

  if (!fn) {
    const type = objectIndexOf(MIME, mime);
    const ext = type ? type.key : 'unknow';
    fn = `unknow.${ext}`;
  }

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fn, { type: mime });
}

/**
 * 检测指定的字符串是否为 Base64 图片编码
 * @param {String} value Base64 图片编码
 */
function isBase64DataURL(value) {
  // data:image/jpeg;base64,...
  /*
   jpg: 'image/jpeg',
   bmp: 'image/bmp',
   png: 'image/png', 或 'image/x-png'
   gif: 'image/gif',
   ico: 'image/x-icon',
   svg: 'image/svg+xml'
   tiff: 'image/tiff'
   */
  const reg = /^data:image\/[^;]+;base64/i;
  return reg.test(value);
}

export { base64toBlob, base64toFile, isBase64DataURL };
