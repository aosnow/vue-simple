import FileOpenerBinder from './selector/opener';
import FileDraggerBinder from './selector/dragger';
import * as EventTypes from './events';

const FileSelector = function(Vue) {
  let selector = null;

  Vue.directive('fileSelector', {
    // 初始化参数
    bind(el, binding) {
      const args = binding.value;
      args.type = args.type || 'input';
    },

    // 创建功能绑定实例
    inserted(el, binding, vnode) {
      const args = binding.value;

      // function _changer(files) {
      //   if (vnode.$emit) {
      //     vnode.$emit(FILE_CHANGED, files);
      //   }
      //   else {
      //     const handler = vnode.data.on[FILE_CHANGED];
      //     if (typeof handler === 'function') handler.call(vnode, files);
      //   }
      // }

      // 通过 eventType 封装回调函数壳
      function _handler(type) {
        if (vnode.$emit) {
          return datas => {
            vnode.$emit(type, datas);
          };
        }

        return datas => {
          const handler = vnode.data.on[type];
          if (typeof handler === 'function') handler.call(vnode, datas);
        };
      }

      // 创建文件选择器
      if (args.type === 'drag') {
        // mouse of drag
        selector = new FileDraggerBinder({
          el,
          multiple: args.multiple,
          accept: args.accept,
          change: _handler(EventTypes.FILE_CHANGED),
          enter: _handler(EventTypes.DRAG_ENTER),
          dragover: _handler(EventTypes.DRAG_OVER),
          leave: _handler(EventTypes.DRAG_LEAVE)
        });
      }
      else {
        // open of input
        selector = new FileOpenerBinder({
          el,
          multiple: args.multiple,
          accept: args.accept,
          change: _handler(EventTypes.FILE_CHANGED)
        });
      }

      // 初始化
      selector.init();
    },

    // 清除选择器
    unbind() {
      if (selector) {
        selector.destory();
        selector = null;
      }
    }
  });
};

export default FileSelector;
