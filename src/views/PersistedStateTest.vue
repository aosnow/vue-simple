<!--------------------------------------------------
  XXX项目 - PersistedStateTest.vue
  这是一个页面的简单介绍。
---------------------------------------------------->
<template>
  <div class="hello">
    <button @click="handler">点击请求新的数据</button>
    <pre class="dataset">{{dataset}}</pre>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PersistedStateTest',
  computed: {
    ...mapGetters({
      dataset: 'info/dataset'
    })
  },
  methods: {
    handler() {
      console.warn('request start:....');
      this.$store.dispatch('info/fetch', { a: 0, b: 1 }).then(data => {
        console.warn(data.data);
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
