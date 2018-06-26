<template>
  <div class="hello">
    <input type="file" ref="file" multiple accept="image/*" @change="fileChanged"/>
    <button @click="clickHandler">模拟点击间接弹窗选择文件</button>
    <button @click="handler">点击上传</button>
    <div class="dataset">
      <div class="img" :class="{start:!v.result}" v-for="(v,k) in imgs" :key="k" @click="editHandler(v)">
        <div class="holder" :style="{'background-image':`url(${v.result})`}"></div>
        <div class="progress" v-if="v.progress>0">
          <div class="bar" :style="{width:`${v.progress*100>>0}%`}"></div>
        </div>
      </div>
    </div>
    <div class="dataset" :class="{enter:isDragEnter}"
         v-file-selector="dragSetting"
         @file-changed="fileChangedFromBinder"
         @drag-enter="dragenter"
         @drag-leave="dragleave">
      文件选择测试
    </div>
    <img-cropper :src="cropfile&&cropfile.result" :crop-width="400" :crop-height="300" @cropped="croppedHandler"></img-cropper>
  </div>
</template>

<script>
import Vue from 'vue';
import { readfile, FileSelector } from 'packages/upload';
import ImgCropper from '../components/ImgCropper';

Vue.use(FileSelector);

export default {
  name: 'FileTest',
  components: {
    ImgCropper
  },
  data() {
    return {
      imgs: {},
      isDragEnter: false,
      dragSetting: {
        type: 'drag',
        multiple: true,
        accept: 'image/*'
      },
      cropfile: null
    };
  },
  computed: {
    uploadFiles() {
      // return Object.values(this.imgs).map(file => file.src);
      return Object.values(this.imgs);
    }
  },
  methods: {
    handler() {
      // 开始上传
      this.$store.dispatch('upload/upload', { files: this.uploadFiles }).then(data => {
        console.warn('upload success:', data);
      });
    },

    // 点击间接触发弹窗选择文件
    clickHandler() {
      this.$refs.file.value = null;
      this.$refs.file.click();
    },

    // 选择需要裁剪的图片
    editHandler(file) {
      this.cropfile = file;
    },

    // 裁剪后的返回新图片数据（blob）
    croppedHandler(blob) {
      if (blob) {
        const fileName = this.cropfile.src.name;
        const fileProperty = {
          type: blob.type,
          lastModified: new Date().getTime()
        };

        // 根据裁剪结果生成新的虚拟文件
        this.cropfile.src = new File([blob], fileName, fileProperty);

        // 预览新结果
        this.preload(this.cropfile);
      }

      // 置空当前裁剪的目标图片
      this.cropfile = null;
    },

    // 预加载图片数据
    preload(rawFile) {
      const key = `${rawFile.src.name}`;

      readfile(rawFile.src).then(data => {
        this.$set(this.imgs[key], 'result', data);
      }).catch();
    },

    setFiles(files) {
      Object.values(files).forEach(file => {
        const key = `${file.name}`;

        if (this.imgs[key]) return;

        const curfile = {
          src: file,
          result: null,
          progress: 0,
          progressor(progressEvent) {
            const { loaded, total } = progressEvent;
            curfile.progress = loaded / total;
          }
        };

        // 设置新的文件项
        this.$set(this.imgs, `${file.name}`, curfile);
        this.preload(curfile);
      });
    },

    dragenter() {
      this.isDragEnter = true;
    },
    dragleave() {
      this.isDragEnter = false;
    },

    fileChanged() {
      this.setFiles(this.$refs.file.files);
    },

    fileChangedFromBinder(files) {
      this.isDragEnter = false;
      this.setFiles(files);
    }
  }
};
</script>

<style lang="less" scoped>
.dataset{
  color: #333;
  font-size: 14px;
  font-family: "Courier New", sans-serif;
  margin: 10px;
  border: 1px solid #ccc;
  overflow: hidden;

  &.enter{
    border-color: red;
  }

  .img{
    width: 200px;
    height: 150px;
    float: left;
    margin: 5px;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.8);
    position: relative;
    overflow: hidden;

    .holder{
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.75);
      background-size: contain;
      background-repeat: no-repeat;
      background-position: 50% 50%;
    }

    .progress{
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 10px;
      background: rgba(0, 0, 0, 0.25);

      .bar{
        width: 30%;
        height: 100%;
        background-color: rgba(0, 255, 0, 0.5);
      }
    }

  }
}
</style>
