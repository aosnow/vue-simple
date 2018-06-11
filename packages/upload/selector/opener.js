/**
 * 给指定元素绑定文件选择窗口事件
 * @param {HTMLElement} el HTML元素
 * @param {Boolean} multiple 是否可多选
 * @param {String} accept 指定能选择的文件类型 mime
 * @param {Function} change 当选择文件后调用的回调
 * @constructor
 */
function FileOpenerBinder({ el, multiple, accept, change }) {
  let _target;
  const handler = change;

  this.init = () => {
    _target = document.createElement('input');
    _target.setAttribute('type', 'file');
    _target.setAttribute('accept', accept);

    // 多选择
    multiple && _target.setAttribute('multiple', '');

    // 选择回调
    _target.addEventListener('change', _changer);
  };

  this.destory = () => {
    _target.removeEventListener('change', _changer);
    _target = null;
  };

  function _changer() {
    if (typeof handler === 'function') handler.call(_target, _target.files);
  }

  function _handler() {
    _target.value = null;
    _target.click();
  }

  el.onclick = _handler;
}

export default FileOpenerBinder;
