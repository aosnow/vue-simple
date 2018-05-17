<!--------------------------------------------------
  XXX项目 - Home.vue
  这是一个页面的简单介绍。
---------------------------------------------------->
<template>
  <div>
    <ul class="menu-list">
      <li v-for="(item,index) in pages" :key="index">
        <router-link :to="{path:item.path}">{{item.meta.title}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
// import router from '../router';

export default {
  name: 'Home',
  data() {
    return {
      router: {
        config: null
      }
    };
  },
  // created() {
  //   import('../router').then(module => {
  //     // this.router = module.default;
  //     this.$set(this.router, 'config', module.default);
  //     console.warn('created:', this.router);
  //   });
  // },
  computed: {
    pages() {
      const list = this.$router.options.routes.filter(item => item.component);
      console.warn('list:', list);

      return list;
    }
  }
};
</script>

<style lang="less" scoped>
.menu-list{

  li{
    padding : 8px 15px;
    float   : left;
  }
}
</style>
