<!--------------------------------------------------
  XXX项目 - PersistedStateTest.vue
  这是一个页面的简单介绍。
---------------------------------------------------->
<template>
  <div class="hello">
    <button @click="handler">点击请求新的数据</button>
    <button @click="persistedHandler">PersistedState[{{isRooted}}]</button>
    <pre class="dataset">{{dataset}}</pre>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { setUnique } from '../../packages';

export default {
  name: 'PersistedStateTest',
  data() {
    return {
      isRooted: true
    };
  },
  computed: {
    ...mapGetters({
      dataset: 'info/dataset'
    })
  },
  methods: {
    handler() {
      console.warn('request start:....');
      // this.$store.dispatch('menu/getMenuList').then(data => {
      this.$store.dispatch('info/fetch').then(data => {
        console.warn(data.data);
      }).catch(reason => {
        console.warn(reason);
      });
    },
    persistedHandler() {
      this.isRooted = !this.isRooted;
      setUnique(this.isRooted ? 'root' : 'a$b%cc@42a');
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
