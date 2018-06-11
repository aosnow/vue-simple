import * as utils from 'packages/utils';

/**
 * 给指定元素绑定文件拖拽事件
 * @param {HTMLElement} el HTML元素
 * @param {Boolean} multiple 是否可多选
 * @param {String} accept 指定能选择的文件类型 mime
 * @param {Function} change 当选择文件后调用的回调
 * @param {Function} [enter] 当拖拽进入区域内时的回调
 * @param {Function} [leave] 当拖拽离开区域内时的回调
 * @param {Function} [dragover] 当拖拽进入区域后在该区域内移动时的回调
 * @constructor
 */
function FileDraggerBinder({ el, multiple, accept, change, enter, leave, dragover }) {
  const self = this;
  let params = { el, multiple, accept, change, enter, leave, dragover };

  this.init = () => {
    // 拖拽事件
    // drop
    params.el.addEventListener('drop', _drop);

    // dragenter
    params.el.addEventListener('dragenter', _dragenter);

    // dragover
    params.el.addEventListener('dragover', _dragover);

    // dragleave
    params.el.addEventListener('dragleave', _dragleave);
  };

  this.destory = () => {
    params.el.removeEventListener('drop', _drop);
    params.el.removeEventListener('dragenter', _dragenter);
    params.el.removeEventListener('dragover', _dragover);
    params.el.removeEventListener('dragleave', _dragleave);
    params = null;
  };

  this.checkAccept = files => files.filter(file => {
    const { type, name, size } = file;
    const extension = name.indexOf('.') > -1 ? `.${name.split('.').pop()}` : ''; // 扩展名 如 .jpg
    const baseType = type.replace(/\/.*$/, ''); // 文件类型 如 image/jpeg，结果为 image

    return params.accept.split(',').filter(mimeType => mimeType.trim()).some(acceptedType => {
      // 文件夹或非正常文件的大小为 0 kb
      if (!size || !type) return false;

      // 直接比较扩展名（假如 accept 设置成了扩展名）
      // 不考虑 application/vnd.ms-excel 吗?
      if (/\..+$/.test(acceptedType)) {
        return extension === acceptedType;
      }

      // 对比 MIME 的前部分，如 image/jpeg 的 image
      if (/\/\*$/.test(acceptedType)) {
        return baseType === acceptedType.replace(/\/\*$/, '');
      }

      // 直接比较文件 mime 和当前 mimetype
      if (/^[^\/]+\/[^\/]+$/.test(acceptedType)) {
        return type === acceptedType;
      }
      return false;
    });
  });

  // 获取文件类型
  this.getFiles = dataTransfer => {
    let files = null;

    if (_isSupportEntry(dataTransfer)) {
      const items = [...dataTransfer.items];

      files = [];

      items.forEach(item => {
        const entry = item.webkitGetAsEntry();

        // 暂不处理文件夹
        // if (entry.isDirectory) {
        //   console.warn('isDirectory:', entry);
        // }

        // 只需要保留拖拽进来的文件类型
        if (entry.isFile) {
          files.push(item.getAsFile());
        }
      });
    }
    else {
      files = [...dataTransfer.files];
    }

    return files;
  };

  function _isSupportEntry(dataTransfer) {
    return dataTransfer.items && dataTransfer.items[0] && dataTransfer.items[0].webkitGetAsEntry;
  }

  function _drop(event) {
    if (event.preventDefault) event.preventDefault();

    const fileList = self.getFiles(event.dataTransfer);
    const acceptFiles = self.checkAccept(fileList);

    if (utils.isFunction(params.change)) params.change.call(params.el, acceptFiles);
    // if (utils.isFunction(params.leave)) params.leave.call(params.el, event);
  }

  function _dragenter(event) {
    if (event.preventDefault) event.preventDefault();
    if (utils.isFunction(params.enter)) params.enter.call(params.el, event);
  }

  function _dragover(event) {
    if (event.preventDefault) event.preventDefault();
    if (utils.isFunction(params.dragover)) params.dragover.call(params.el, event);
  }

  function _dragleave(event) {
    if (event.preventDefault) event.preventDefault();
    if (utils.isFunction(params.leave)) params.leave.call(params.el, event);
  }
}

export default FileDraggerBinder;
