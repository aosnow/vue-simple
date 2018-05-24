<!--------------------------------------------------
  XXX项目 - AxiosTest.vue
  这是一个页面的简单介绍。
---------------------------------------------------->
<template>
  <div class="hello">
    <button @click="handler">点击发送新的 Axios 请求</button>
  </div>
</template>

<script>
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
      this.$store.dispatch('info/fetch').then(response => {
        console.warn('success:', response, response ? response.data : null);
      }).catch(error => {
        console.warn('Axios Post Error:', error, typeof error);
        Object.keys(error).forEach(key => {
          console.warn(key, error[key]);
        });
      });
    }
  }
};
</script>

<style scoped>
/* styles define: */
</style>
