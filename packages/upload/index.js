import FileSelector from './fileSelector';
import * as EventTypes from './events';
import FileOpenerBinder from './selector/opener';
import FileDraggerBinder from './selector/dragger';

const ReadType = {
  // 按字节读取文件内容，结果用ArrayBuffer对象表示
  ArrayBuffer: 'readAsArrayBuffer',
  // 按字节读取文件内容，结果为文件的二进制串
  BinaryString: 'readAsBinaryString',
  // 读取文件内容，结果用data:url的字符串形式表示
  DataURL: 'readAsDataURL',
  // 按字符读取文件内容，结果用字符串形式表示
  Text: 'readAsText'
};

/**
 * 异步读取图片数据为 base64
 * @param {File} rawFile
 * @param {String} [type]
 */
const readfile = (rawFile, type = ReadType.DataURL) => new Promise((resolve, reject) => {
  if (rawFile.toString() !== '[object File]') {
    console.warn('the file\'s type is error.');
    reject(rawFile);
  }

  let reader = null;

  const loadHandler = event => {
    const fr = event.target || event.srcElement;

    if (event.type === 'load') {
      resolve(fr.result);

      fr.removeEventListener('load', loadHandler);
      // fr.removeEventListener('progress', loadHandler);
    }
    else if (event.type === 'error') {
      fr.abort();
      reject(event);
    }

    reader = null;
  };

  reader = new FileReader();
  reader[type](rawFile);
  reader.addEventListener('load', loadHandler);
  reader.addEventListener('error', loadHandler);
});

export { readfile, ReadType, FileSelector, EventTypes, FileOpenerBinder, FileDraggerBinder };
