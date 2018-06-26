<template>
  <div class="img-cropper" v-show="cropper">
    <img :src="src" alt="" :ref="'imgCropTarget'">
    <div class="img-cropper-preview"></div>
    <div class="tools">
      <span class="move" :class="{actived:isMoveMode}" title="切换到移动图片状态" @click="handler('move')"></span>
      <span class="rotate" title="顺时针旋转图片 30 度" @click="handler('rotate')"></span>
      <span class="rotate-reverse" title="逆时针旋转图片 30 度" @click="handler('rotate-reverse')"></span>
      <!--<span class="image" title="从本地导入新的图片" @click="handler('image')"></span>-->
      <span class="cancel" title="取消裁剪重置到初始状态" @click="handler('cancel')"></span>
      <span class="ok" title="确定裁剪" @click="handler('ok')"></span>
      <span class="quit" title="退出" @click="handler('quit')"></span>
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

export default {
  name: 'ImgCropper',
  props: {
    // Library props
    src: {
      type: String,
      default: ''
    },

    // 裁剪尺寸比例和最终输出图片尺寸
    cropWidth: Number,
    cropHeight: Number,

    // 输出 mimetype
    mimeType: {
      type: String,
      default: 'image/jpeg'
    },

    /*
     CropperJS props
     0: the crop box is just within the container 裁剪框在最外层容器内移动
     1: the crop box should be within the canvas 裁剪框限制在图片范围内移动（避免出现空白区域）
     2: the canvas should not be within the container 与选项1类似，但图片允许包含在容器内（contain）
     3: the container should be within the canvas 与选项2类似，但图片始终占满整个容器（cover）
     */
    viewMode: {
      type: Number,
      default: 2
    },
    dragMode: {
      type: String,
      default: 'crop'
    },
    aspectRatio: Number,
    data: Object,
    preview: {
      type: String,
      default: '.img-cropper-preview'
    },
    responsive: {
      type: Boolean,
      default: true
    },
    restore: {
      type: Boolean,
      default: true
    },
    checkCrossOrigin: {
      type: Boolean,
      default: true
    },
    checkOrientation: {
      type: Boolean,
      default: true
    },
    modal: {
      type: Boolean,
      default: true
    },
    guides: {
      type: Boolean,
      default: true
    },
    center: {
      type: Boolean,
      default: true
    },
    highlight: {
      type: Boolean,
      default: true
    },
    background: {
      type: Boolean,
      default: true
    },
    autoCrop: {
      type: Boolean,
      default: true
    },
    autoCropArea: Number,
    movable: {
      type: Boolean,
      default: true
    },
    rotatable: {
      type: Boolean,
      default: true
    },
    scalable: {
      type: Boolean,
      default: true
    },
    zoomable: {
      type: Boolean,
      default: true
    },
    zoomOnTouch: {
      type: Boolean,
      default: true
    },
    zoomOnWheel: {
      type: Boolean,
      default: true
    },
    wheelZoomRatio: Number,
    cropBoxMovable: {
      type: Boolean,
      default: true
    },
    cropBoxResizable: {
      type: Boolean,
      default: true
    },
    toggleDragModeOnDblclick: {
      type: Boolean,
      default: true
    },

    // Size limitation
    minCanvasWidth: Number,
    minCanvasHeight: Number,
    minCropBoxWidth: Number,
    minCropBoxHeight: Number,
    minContainerWidth: Number,
    minContainerHeight: Number,

    // callbacks
    ready: Function,
    cropstart: Function,
    cropmove: Function,
    cropend: Function,
    crop: Function,
    zoom: Function
  },
  data() {
    return {
      cropper: null,
      isMoveMode: false
    };
  },
  methods: {
    // Reset the image and crop box to their initial states
    reset() {
      return this.cropper.reset();
    },

    // Clear the crop box
    clear() {
      return this.cropper.clear();
    },

    // Init crop box manually
    initCrop() {
      return this.cropper.crop();
    },

    /**
     * Replace the image's src and rebuild the cropper
     * @param {string} url - The new URL.
     * @param {boolean} [onlyColorChanged] - Indicate if the new image only changed color.
     * @returns {Object} this
     */
    replace(url, onlyColorChanged = false) {
      return this.cropper.replace(url, onlyColorChanged);
    },

    // Enable (unfreeze) the cropper
    enable() {
      return this.cropper.enable();
    },

    // Disable (freeze) the cropper
    disable() {
      return this.cropper.disable();
    },

    // Destroy the cropper and remove the instance from the image
    destroy() {
      return this.cropper.destroy();
    },

    /**
     * Move the canvas with relative offsets
     * @param {number} offsetX - The relative offset distance on the x-axis.
     * @param {number} offsetY - The relative offset distance on the y-axis.
     * @returns {Object} this
     */
    move(offsetX, offsetY) {
      return this.cropper.move(offsetX, offsetY);
    },

    /**
     * Move the canvas to an absolute point
     * @param {number} x - The x-axis coordinate.
     * @param {number} [y=x] - The y-axis coordinate.
     * @returns {Object} this
     */
    moveTo(x, y) {
      return this.cropper.moveTo(x, y || x);
    },

    /**
     * Zoom the canvas with a relative ratio
     * @param {number} ratio - The target ratio.
     * @param {Event} _originalEvent - The original event if any.
     * @returns {Object} this
     */
    relativeZoom(ratio, _originalEvent) {
      return this.cropper.zoom(ratio, _originalEvent);
    },

    /**
     * Zoom the canvas to an absolute ratio
     * @param {number} ratio - The target ratio.
     * @param {Event} _originalEvent - The original event if any.
     * @returns {Object} this
     */
    zoomTo(ratio, _originalEvent) {
      return this.cropper.zoomTo(ratio, _originalEvent);
    },

    /**
     * Rotate the canvas with a relative degree
     * @param {number} degree - The rotate degree.
     * @returns {Object} this
     */
    rotate(degree) {
      return this.cropper.rotate(degree);
    },

    /**
     * Rotate the canvas to an absolute degree
     * @param {number} degree - The rotate degree.
     * @returns {Object} this
     */
    rotateTo(degree) {
      return this.cropper.rotateTo(degree);
    },

    /**
     * Scale the image on the x-axis.
     * @param {number} scaleX - The scale ratio on the x-axis.
     * @returns {Object} this
     */
    scaleX(scaleX) {
      return this.cropper.scaleX(scaleX);
    },

    /**
     * Scale the image on the y-axis.
     * @param {number} scaleY - The scale ratio on the y-axis.
     * @returns {Object} this
     */
    scaleY(scaleY) {
      return this.cropper.scaleY(scaleY);
    },

    /**
     * Scale the image
     * @param {number} scaleX - The scale ratio on the x-axis.
     * @param {number} [scaleY=scaleX] - The scale ratio on the y-axis.
     * @returns {Object} this
     */
    scale(scaleX, scaleY) {
      return this.cropper.scale(scaleX, scaleY || scaleX);
    },

    /**
     * Get the cropped area position and size data (base on the original image)
     * @param {boolean} [rounded=false] - Indicate if round the data values or not.
     * @returns {Object} The result cropped data.
     */
    getData(rounded = false) {
      return this.cropper.getData(rounded);
    },

    /**
     * Set the cropped area position and size with new data
     * @param {Object} data - The new data.
     * @returns {Object} this
     */
    setData(data) {
      return this.cropper.setData(data);
    },

    /**
     * Get the container size data.
     * @returns {Object} The result container data.
     */
    getContainerData() {
      return this.cropper.getContainerData();
    },

    /**
     * Get the image position and size data.
     * @returns {Object} The result image data.
     */
    getImageData() {
      return this.cropper.getImageData();
    },

    /**
     * Get the canvas position and size data.
     * @returns {Object} The result canvas data.
     */
    getCanvasData() {
      return this.cropper.getCanvasData();
    },

    /**
     * Set the canvas position and size with new data.
     * @param {Object} data - The new canvas data.
     * @returns {Object} this
     */
    setCanvasData(data) {
      return this.cropper.setCanvasData(data);
    },

    /**
     * Get the crop box position and size data.
     * @returns {Object} The result crop box data.
     */
    getCropBoxData() {
      return this.cropper.getCropBoxData();
    },

    /**
     * Set the crop box position and size with new data.
     * @param {Object} data - The new crop box data.
     * @returns {Object} this
     */
    setCropBoxData(data) {
      return this.cropper.setCropBoxData(data);
    },

    /**
     * Get a canvas drawn the cropped image.
     * @param {Object} [options={}] - The config options.
     * @returns {HTMLCanvasElement} - The result canvas.
     */
    getCroppedCanvas(options = {}) {
      return this.cropper.getCroppedCanvas(options);
    },

    /**
     * Change the aspect ratio of the crop box.
     * @param {number} aspectRatio - The new aspect ratio.
     * @returns {Object} this
     */
    setAspectRatio(aspectRatio) {
      return this.cropper.setAspectRatio(aspectRatio);
    },

    /**
     * Change the drag mode.
     * @param {string} mode - The new drag mode.
     * @returns {Object} this
     */
    setDragMode(mode) {
      return this.cropper.setDragMode(mode);
    },

    /**
     * 重新渲染裁剪工具
     */
    render() {
      this.$nextTick(() => {
        // 配置选项
        const { src, cropWidth, cropHeight, mimeType, ...options } = this.$props;
        const props = {};

        Object.keys(options).forEach(key => {
          if (this[key]) {
            props[key] = this[key];
          }
        });

        // 尺寸处理：裁剪比例
        if (!props['aspectRatio'] && cropWidth && cropHeight) {
          props['aspectRatio'] = (cropWidth / cropHeight).toFixed(2);
        }

        // 事件监听
        const { ready, cropstart, cropmove, cropend, crop, zoom } = this.$listeners;
        ready && (props.ready = ready);
        cropstart && (props.cropstart = cropstart);
        cropmove && (props.cropmove = cropmove);
        cropend && (props.cropend = cropend);
        crop && (props.crop = crop);
        zoom && (props.zoom = zoom);

        this.cropper = new Cropper(this.$refs['imgCropTarget'], props);
      });
    },

    // 事件委托
    handler(type) {
      switch (type) {
        case 'move': {
          this.isMoveMode = !this.isMoveMode;
          this.setDragMode(this.isMoveMode ? 'move' : 'crop');
          break;
        }
        case 'rotate': {
          this.rotate(15);
          break;
        }
        case 'rotate-reverse': {
          this.rotate(-15);
          break;
        }
        // case 'image':{break;}
        case 'cancel': {
          this.reset();
          break;
        }
        case 'ok': {
          const canvasOptions = {};
          this.cropWidth && (canvasOptions.width = this.cropWidth);
          this.cropHeight && (canvasOptions.height = this.cropHeight);

          // console.warn(this.getCroppedCanvas({
          //   minWidth: 400,
          //   maxWidth: 400,
          //   minHeight: 300,
          //   maxHeight: 300,
          //   width: 400,
          //   height: 300,
          //   imageSmoothingEnabled: false,
          //   imageSmoothingQuality: 'high'
          // }));
          // console.warn(this.cropper.getCropBoxData());
          this.getCroppedCanvas(canvasOptions).toBlob(blob => {
            this.$emit('cropped', blob);
          }, this.mimeType || 'image/jpeg');

          this.destroy();
          this.cropper = null;
          break;
        }
        case 'quit': {
          this.destroy();
          this.cropper = null;
          this.$emit('cropped', null);
          break;
        }
      }
    }
  },
  watch: {
    src() {
      this.src && this.render();
    }
  },
  mounted() {
    this.src && this.render();
  }
};
</script>

<style lang="less" scoped>
.img-cropper{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  img{
    margin: auto;
  }

  .img-cropper-preview{
    position: absolute;
    width: 20%;
    height: 20% * 0.75;
    right: 20px;
    top: 20px;
    overflow: hidden;
    opacity: 0.8;
    background-color: rgba(0, 0, 0, 0.2);
    border: 5px solid rgba(255, 255, 255, 0.3);
  }

  .tools{
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translate(-50%, 0);
    display: flex;
    overflow: hidden;
    padding: 5px;
    border-radius: 8px;
    font-size: 16px;

    .move{
      background-image: url("data:image/svg+xml;base64,PCEtLSBHZW5lcmF0ZWQgYnkgSWNvTW9vbi5pbyAtLT4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMjQiIGhlaWdodD0iMTAyNCIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCI+Cjx0aXRsZT48L3RpdGxlPgo8ZyBpZD0iaWNvbW9vbi1pZ25vcmUiPgo8L2c+CjxwYXRoIGQ9Ik05NzcuMDY3IDUyOS4wNjdjNC4yNjctOC41MzMgNC4yNjctMjEuMzMzIDAtMzQuMTMzLTQuMjY3LTQuMjY3LTQuMjY3LTguNTMzLTguNTMzLTEyLjhsLTEyOC0xMjhjLTE3LjA2Ny0xNy4wNjctNDIuNjY3LTE3LjA2Ny01OS43MzMgMHMtMTcuMDY3IDQyLjY2NyAwIDU5LjczM2w1NS40NjcgNTUuNDY3aC0yODEuNnYtMjgxLjZsNTUuNDY3IDU1LjQ2N2M4LjUzMyA4LjUzMyAxNy4wNjcgMTIuOCAyOS44NjcgMTIuOHMyMS4zMzMtNC4yNjcgMjkuODY3LTEyLjhjMTcuMDY3LTE3LjA2NyAxNy4wNjctNDIuNjY3IDAtNTkuNzMzbC0xMjgtMTI4Yy00LjI2Ny00LjI2Ny04LjUzMy04LjUzMy0xMi44LTguNTMzLTguNTMzLTQuMjY3LTIxLjMzMy00LjI2Ny0zNC4xMzMgMC00LjI2NyA0LjI2Ny04LjUzMyA0LjI2Ny0xMi44IDguNTMzbC0xMjggMTI4Yy0xNy4wNjcgMTcuMDY3LTE3LjA2NyA0Mi42NjcgMCA1OS43MzNzNDIuNjY3IDE3LjA2NyA1OS43MzMgMGw1NS40NjctNTUuNDY3djI4MS42aC0yODEuNmw1NS40NjctNTUuNDY3YzE3LjA2Ny0xNy4wNjcgMTcuMDY3LTQyLjY2NyAwLTU5LjczM3MtNDIuNjY3LTE3LjA2Ny01OS43MzMgMGwtMTI4IDEyOGMtNC4yNjcgNC4yNjctOC41MzMgOC41MzMtOC41MzMgMTIuOC00LjI2NyA4LjUzMy00LjI2NyAyMS4zMzMgMCAzNC4xMzMgNC4yNjcgNC4yNjcgNC4yNjcgOC41MzMgOC41MzMgMTIuOGwxMjggMTI4YzguNTMzIDguNTMzIDE3LjA2NyAxMi44IDI5Ljg2NyAxMi44czIxLjMzMy00LjI2NyAyOS44NjctMTIuOGMxNy4wNjctMTcuMDY3IDE3LjA2Ny00Mi42NjcgMC01OS43MzNsLTU1LjQ2Ny01NS40NjdoMjgxLjZ2MjgxLjZsLTU1LjQ2Ny01NS40NjdjLTE3LjA2Ny0xNy4wNjctNDIuNjY3LTE3LjA2Ny01OS43MzMgMHMtMTcuMDY3IDQyLjY2NyAwIDU5LjczM2wxMjggMTI4YzQuMjY3IDQuMjY3IDguNTMzIDguNTMzIDEyLjggOC41MzMgNC4yNjcgNC4yNjcgMTIuOCA0LjI2NyAxNy4wNjcgNC4yNjdzMTIuOCAwIDE3LjA2Ny00LjI2N2M0LjI2Ny00LjI2NyA4LjUzMy00LjI2NyAxMi44LTguNTMzbDEyOC0xMjhjMTcuMDY3LTE3LjA2NyAxNy4wNjctNDIuNjY3IDAtNTkuNzMzcy00Mi42NjctMTcuMDY3LTU5LjczMyAwbC01NS40NjcgNTUuNDY3di0yODEuNmgyODEuNmwtNTUuNDY3IDU1LjQ2N2MtMTcuMDY3IDE3LjA2Ny0xNy4wNjcgNDIuNjY3IDAgNTkuNzMzIDguNTMzIDguNTMzIDIxLjMzMyAxMi44IDI5Ljg2NyAxMi44czIxLjMzMy00LjI2NyAyOS44NjctMTIuOGwxMjgtMTI4YzQuMjY3LTQuMjY3IDguNTMzLTguNTMzIDguNTMzLTEyLjh6Ij48L3BhdGg+Cjwvc3ZnPgo=");
    }
    .rotate{
      background-image: url("data:image/svg+xml;base64,PCEtLSBHZW5lcmF0ZWQgYnkgSWNvTW9vbi5pbyAtLT4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMjQiIGhlaWdodD0iMTAyNCIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCI+Cjx0aXRsZT48L3RpdGxlPgo8ZyBpZD0iaWNvbW9vbi1pZ25vcmUiPgo8L2c+CjxwYXRoIGQ9Ik04MzMuMDg4IDUzNi41NDRsLTEzMC44OC0xMzAuODhoNzYuNjcyYy0wLjcwNC0xLjkyLTEuNDQtMy44MDgtMi4xNzYtNS42OTYtNDUuNDcyLTExNS4yNjQtMTU3Ljg1Ni0xOTYuOC0yODkuMjgtMTk2LjgtMTcxLjY4IDAtMzEwLjg4IDEzOS4yLTMxMC44OCAzMTAuODggMCAxNzEuNzEyIDEzOS4yIDMxMC45MTIgMzEwLjg4IDMxMC45MTIgMTI2LjMwNCAwIDIzNS4wMDgtNzUuMzI4IDI4My42NDgtMTgzLjQ1NiAwLjQ4LTAuOTkyIDAuNzY4LTIuMTEyIDEuMjE2LTMuMTY4bDgzLjM2IDgyLjg0OGMtMC41NDQgMC45Ni0wLjkyOCAyLjA0OC0xLjUwNCAzLjA3Mi0wLjEyOCAwLjIyNC0wLjI1NiAwLjQ0OC0wLjM4NCAwLjY0LTczLjU2OCAxMjcuMTA0LTIxMS4wMDggMjEyLjU3Ni0zNjguNDE2IDIxMi41NzYtMjM0Ljg4LTAuMDY0LTQyNS4zNDQtMTkwLjUyOC00MjUuMzQ0LTQyNS40NzJzMTkwLjQ2NC00MjUuNDA4IDQyNS40MDgtNDI1LjQwOGMxOTYuNDE2IDAgMzYxLjY5NiAxMzMuMDU2IDQxMC42NTYgMzEzLjk4NCAwLjQ4IDEuNjY0IDAuNjA4IDMuNDI0IDEuMDI0IDUuMDg4aDY2LjkxMmwtMTMwLjkxMiAxMzAuODh6Ij48L3BhdGg+Cjwvc3ZnPgo=");
    }
    .rotate-reverse{
      background-image: url("data:image/svg+xml;base64,PCEtLSBHZW5lcmF0ZWQgYnkgSWNvTW9vbi5pbyAtLT4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMjQiIGhlaWdodD0iMTAyNCIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCI+Cjx0aXRsZT48L3RpdGxlPgo8ZyBpZD0iaWNvbW9vbi1pZ25vcmUiPgo8L2c+CjxwYXRoIGQ9Ik0xOTAuOTEyIDUzNi41NDRsMTMwLjg4LTEzMC44OGgtNzYuNzA0YzAuNzA0LTEuOTIgMS40NC0zLjgwOCAyLjE0NC01LjY5NiA0NS41MDQtMTE1LjI2NCAxNTcuODg4LTE5Ni44IDI4OS4yOC0xOTYuOCAxNzEuNzEyIDAgMzEwLjkxMiAxMzkuMiAzMTAuOTEyIDMxMC44OCAwIDE3MS43MTItMTM5LjIgMzEwLjkxMi0zMTAuOTEyIDMxMC45MTItMTI2LjI3MiAwLTIzNC45NzYtNzUuMzI4LTI4My42MTYtMTgzLjQ1Ni0wLjQ4LTAuOTkyLTAuNzY4LTIuMTEyLTEuMjQ4LTMuMTY4bC04My4zNiA4Mi44NDhjMC41NzYgMC45NiAwLjk2IDIuMDQ4IDEuNTM2IDMuMDcyIDAuMTI4IDAuMjI0IDAuMjU2IDAuNDQ4IDAuMzg0IDAuNjQgNzMuNTY4IDEyNy4xMDQgMjExLjAwOCAyMTIuNTc2IDM2OC40MTYgMjEyLjU3NiAyMzQuOTQ0IDAgNDI1LjQwOC0xOTAuNDY0IDQyNS40MDgtNDI1LjQwOHMtMTkwLjQ5Ni00MjUuNDcyLTQyNS40NC00MjUuNDcyYy0xOTYuNDE2IDAtMzYxLjY5NiAxMzMuMDU2LTQxMC42NTYgMzEzLjk4NC0wLjQ4IDEuNjY0LTAuNjQgMy40MjQtMS4wMjQgNS4wODhoLTY2LjkxMmwxMzAuOTEyIDEzMC44OHoiPjwvcGF0aD4KPC9zdmc+Cg==");
    }
    .image{
      background-image: url("data:image/svg+xml;base64,PCEtLSBHZW5lcmF0ZWQgYnkgSWNvTW9vbi5pbyAtLT4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMjQiIGhlaWdodD0iMTAyNCIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCI+Cjx0aXRsZT48L3RpdGxlPgo8ZyBpZD0iaWNvbW9vbi1pZ25vcmUiPgo8L2c+CjxwYXRoIGQ9Ik0zNjIuNjY3IDM0MS4yOTFjMzUuMjg1IDAgNjQgMjguNzE1IDY0IDY0cy0yOC43MTUgNjQtNjQgNjQtNjQtMjguNzE1LTY0LTY0IDI4LjcxNS02NCA2NC02NE0zNjIuNjY3IDI5OC42MjRjLTU4LjkyMyAwLTEwNi42NjcgNDcuNzQ0LTEwNi42NjcgMTA2LjY2N3M0Ny43NDQgMTA2LjY2NyAxMDYuNjY3IDEwNi42NjcgMTA2LjY2Ny00Ny43NDQgMTA2LjY2Ny0xMDYuNjY3LTQ3Ljc0NC0xMDYuNjY3LTEwNi42NjctMTA2LjY2N3oiPjwvcGF0aD4KPHBhdGggZD0iTTY4Mi42NjcgNTExLjk1N2MxOS4yIDIuMTc2IDU0LjE4NyA3Ni45NzEgNzUuOTA0IDE3MC43MDloLTQ4Ni4wNTljMTguNTE3LTQ0LjExNyA0NS4wMTMtODUuMzc2IDY4Ljc3OS04NS4zNzYgMzQuMzg5IDAgNDggNy44OTMgNjUuMjggMTcuOTIgMTkuMDcyIDExLjAwOCA0Mi45MjMgMjQuNzQ3IDg0LjA1MyAyNC43NDcgNDguNTU1IDAgODIuODU5LTM3Ljc2IDExMy4xOTUtNzEuMDgzIDI2Ljc1Mi0yOS4zMTIgNTEuOTY4LTU2LjkxNyA3OC44NDgtNTYuOTE3TTY4Mi42NjcgNDY5LjI5MWMtODUuMzMzIDAtMTI4IDEyOC0xOTIgMTI4cy02My45NTctNDIuNjY3LTE0OS4zMzMtNDIuNjY3Yy04NS4zMzMgMC0xMjguMDQzIDE3MC42NjctMTI4LjA0MyAxNzAuNjY3aDU5Ny4zNzZjMCAwLTQyLjY2Ny0yNTYtMTI4LTI1NnoiPjwvcGF0aD4KPHBhdGggZD0iTTkzOC42NjcgMjU2YzAtNDcuMTA0LTM4LjIyOS04NS4zMzMtODUuMzMzLTg1LjMzM2gtNjgyLjY2N2MtNDcuMTA0IDAtODUuMzMzIDM4LjIyOS04NS4zMzMgODUuMzMzdjUxMmMwIDQ3LjEwNCAzOC4yMjkgODUuMzMzIDg1LjMzMyA4NS4zMzNoNjgyLjY2N2M0Ny4xMDQgMCA4NS4zMzMtMzguMjI5IDg1LjMzMy04NS4zMzN2LTUxMnpNODUzLjMzMyA3NjhoLTY4Mi42Njd2LTUxMmg2ODIuNzk1bC0wLjEyOCA1MTJ6Ij48L3BhdGg+Cjwvc3ZnPgo=");
    }
    .ok{
      background-image: url("data:image/svg+xml;base64,PCEtLSBHZW5lcmF0ZWQgYnkgSWNvTW9vbi5pbyAtLT4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMjQiIGhlaWdodD0iMTAyNCIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCI+Cjx0aXRsZT48L3RpdGxlPgo8ZyBpZD0iaWNvbW9vbi1pZ25vcmUiPgo8L2c+CjxwYXRoIGZpbGw9IiMwMDAiIGQ9Ik00MDUgNjk2bDQ1Mi00NTQgNjAgNjAtNTEyIDUxMi0yOTgtMjk4IDU4LTYwIDI0MCAyNDB6Ij48L3BhdGg+Cjwvc3ZnPgo=");
    }
    .cancel{
      background-image: url("data:image/svg+xml;base64,PCEtLSBHZW5lcmF0ZWQgYnkgSWNvTW9vbi5pbyAtLT4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMjQiIGhlaWdodD0iMTAyNCIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCI+Cjx0aXRsZT48L3RpdGxlPgo8ZyBpZD0iaWNvbW9vbi1pZ25vcmUiPgo8L2c+CjxwYXRoIGQ9Ik04MTAgMjc0bC0yMzggMjM4IDIzOCAyMzgtNjAgNjAtMjM4LTIzOC0yMzggMjM4LTYwLTYwIDIzOC0yMzgtMjM4LTIzOCA2MC02MCAyMzggMjM4IDIzOC0yMzh6Ij48L3BhdGg+Cjwvc3ZnPgo=");
    }
    .quit{
      background-image: url("data:image/svg+xml;base64,PCEtLSBHZW5lcmF0ZWQgYnkgSWNvTW9vbi5pbyAtLT4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMjQiIGhlaWdodD0iMTAyNCIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCI+Cjx0aXRsZT48L3RpdGxlPgo8ZyBpZD0iaWNvbW9vbi1pZ25vcmUiPgo8L2c+CjxwYXRoIGQ9Ik0zODQgODUzLjMzM2gtMTcwLjY2N2MtMjUuNiAwLTQyLjY2Ny0xNy4wNjctNDIuNjY3LTQyLjY2N3YtNTk3LjMzM2MwLTI1LjYgMTcuMDY3LTQyLjY2NyA0Mi42NjctNDIuNjY3aDE3MC42NjdjMjUuNiAwIDQyLjY2Ny0xNy4wNjcgNDIuNjY3LTQyLjY2N3MtMTcuMDY3LTQyLjY2Ny00Mi42NjctNDIuNjY3aC0xNzAuNjY3Yy03Mi41MzMgMC0xMjggNTUuNDY3LTEyOCAxMjh2NTk3LjMzM2MwIDcyLjUzMyA1NS40NjcgMTI4IDEyOCAxMjhoMTcwLjY2N2MyNS42IDAgNDIuNjY3LTE3LjA2NyA0Mi42NjctNDIuNjY3cy0xNy4wNjctNDIuNjY3LTQyLjY2Ny00Mi42Njd6Ij48L3BhdGg+CjxwYXRoIGQ9Ik05MzQuNCA1MjkuMDY3YzQuMjY3LTguNTMzIDQuMjY3LTIxLjMzMyAwLTM0LjEzMy00LjI2Ny00LjI2Ny00LjI2Ny04LjUzMy04LjUzMy0xMi44bC0yMTMuMzMzLTIxMy4zMzNjLTE3LjA2Ny0xNy4wNjctNDIuNjY3LTE3LjA2Ny01OS43MzMgMHMtMTcuMDY3IDQyLjY2NyAwIDU5LjczM2wxNDAuOCAxNDAuOGgtNDA5LjZjLTI1LjYgMC00Mi42NjcgMTcuMDY3LTQyLjY2NyA0Mi42NjdzMTcuMDY3IDQyLjY2NyA0Mi42NjcgNDIuNjY3aDQwOS42bC0xNDAuOCAxNDAuOGMtMTcuMDY3IDE3LjA2Ny0xNy4wNjcgNDIuNjY3IDAgNTkuNzMzIDguNTMzIDguNTMzIDIxLjMzMyAxMi44IDI5Ljg2NyAxMi44czIxLjMzMy00LjI2NyAyOS44NjctMTIuOGwyMTMuMzMzLTIxMy4zMzNjNC4yNjctNC4yNjcgOC41MzMtOC41MzMgOC41MzMtMTIuOHoiPjwvcGF0aD4KPC9zdmc+Cg==");
    }

    span{
      display: block;
      width: 25px;
      height: 25px;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
      background-size: 60%;
      background-color: rgba(255, 255, 255, 0.2);
      background-repeat: no-repeat;
      background-position: center;
      margin-right: 1px;

      &:last-child{
        margin-right: 0;
      }

      &:hover, &.actived{
        background-color: rgba(255, 255, 255, 0.8);
      }
    }
  }
}
</style>
