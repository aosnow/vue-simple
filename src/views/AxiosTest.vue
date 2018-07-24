<!--------------------------------------------------
  XXX项目 - AxiosTest.vue
  这是一个页面的简单介绍。
---------------------------------------------------->
<template>
  <div class="hello">
    <button @click="handler">点击发送新的 Axios 请求</button>
    <button @click="cancelHandler">取消所有未结束的 Axios 请求</button>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'AxiosTest',
  data() {
    return {
      msg: 'XXX项目 - AxiosTest.vue'
    };
  },
  methods: {
    handler() {
      console.warn('request start:....');
      this.$store.dispatch('info/cancel').then(response => {
        console.warn('success:', response, response ? response.data : null);
      }).catch(error => {
        console.warn('Axios Post Error:', error, typeof error);
        Object.keys(error).forEach(key => {
          console.warn(key, error[key]);
        });
      });
    },
    cancelHandler() {
      Vue.$api.cancel();
    }
  }
};
</script>

<style lang="less" scoped>
button, input[type=button]{
  border: 1px solid #333;
  padding: 10px 20px;
  background: #fff;
  border-radius: 4px;

  &:hover{
    background: rgba(131, 198, 164, 0.47);
  }
}
</style>
