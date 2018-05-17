<!--------------------------------------------------
  XXX项目 - AxiosTest.vue
  这是一个页面的简单介绍。
---------------------------------------------------->
<template>
  <div class="hello">
    {{msg}}
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
  created() {
    console.warn('request start:....');
    Vue.$api.post('/user/login', { username: '10000', password: '123456', type: 'EMPLOYEE' }).then(response => {
      console.warn(response.data);
    });
  }
};
</script>

<style scoped>
/* styles define: */
</style>
