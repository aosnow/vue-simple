<!--------------------------------------------------
  XXX项目 - PersistedStateTest.vue
  这是一个页面的简单介绍。
---------------------------------------------------->
<template>
  <div class="hello">
    <button @click="handler">点击下载</button>
    <pre class="dataset">{{dataset}}</pre>
  </div>
</template>

<script>
import { BlobFile, MIME } from '../../packages/BlobFile/index';

export default {
  name: 'ExcelTest',
  data() {
    return {
      dataset: []
    };
  },
  methods: {
    handler() {
      this.$store.dispatch('info/excel', {
        name: '',
        page_num: 1,
        page_size: 10,
        shopper_id: 9355,
        store_ids: []
      }).then(res => {
        this.dataset = res.data;
        const file = new BlobFile({
          data: res.data,
          filename: 'test',
          mime: MIME.xls,
          endings: 'native'
        });
        file.download();

        // 注销占用资源
        file.destory();
      });
    }
  }
};
</script>

<style lang="less" scoped>
.dataset{
  color       : #333;
  font-size   : 14px;
  font-family : "Courier New", sans-serif;
  margin      : 10px;
  padding     : 20px;
  border      : 1px solid #ccc;
}
</style>
