import { MIME, Downloader } from '../BlobFile';
import { base64toBlob, objectIndexOf } from '../utils';

/**
 * 将图片元素通过 canvas 读取 base64 编码
 * @param {HTMLImageElement} imageElement
 * @param {Number} [width] 新的宽度（不设置直接使用图片元素宽度）
 * @param {Number} [height] 新的高度（不设置直接使用图片元素高度）
 * @returns {string}
 */
function getBase64FromImage(imageElement, width, height) { // width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
  const canvas = document.createElement('canvas');
  canvas.width = width ? width : imageElement.width;
  canvas.height = height ? height : imageElement.height;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

  return canvas.toDataURL();
}

/**
 * 将远程图片读取成 base64 编码
 * @param {String} url 图片地址
 * @returns {Promise<any>}
 */
function loadImageBase64(url) {

  const image = new Image();
  image.crossOrigin = 'anonymous';
  image.src = url;

  return new Promise((resolve, reject) => {

    // 加载成功
    image.onload = () => {
      resolve(getBase64FromImage(image)); // 将base64传给done上传处理
    };

    // 加载失败
    image.onerror = error => {
      reject(error);
    };

  });

}

/**
 * 使用 base64 编码进行图片下载
 * @param {String} base64 图片的 Base64 编码
 * @param {String} [fullname] 文件名称（不需要扩展名）
 */
function downloadImageBase64(base64, fullname) {
  const blob = base64toBlob(base64);
  const type = objectIndexOf(MIME, blob.type);
  const ext = type ? type.key : 'unknow';
  const lastName = `${fullname ? fullname : 'unknow'}.${ext}`;

  Downloader(blob, lastName);
}

export { loadImageBase64, getBase64FromImage, downloadImageBase64 };
