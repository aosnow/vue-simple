<!--------------------------------------------------
  XXX项目 - PersistedStateTest.vue
  这是一个页面的简单介绍。
---------------------------------------------------->
<template>
  <div class="hello">
    <input type="text" placeholder="请输入图片地址" v-model="src">
    <button @click="handler">点击预览</button>
    <button @click="download">点击下载</button>
    <pre class="dataset">
      <img :src="preBase64Data" alt="">
    </pre>
  </div>
</template>

<script>
import { loadImageBase64, downloadImageBase64 } from '../../packages';

export default {
  name: 'ImageTest',
  data() {
    return {
      src: null,
      preBase64Data: null
    };
  },
  methods: {
    handler() {
      loadImageBase64(this.src).then(data => {
        this.preBase64Data = data;
      });
    },
    download() {
      if (this.preBase64Data) {
        downloadImageBase64(this.preBase64Data, '测试图片');
      }
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
  padding: 20px;
  border: 1px solid #ccc;
}
</style>
