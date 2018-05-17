<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style lang="less">
@import "./css/reset";
#app{
  font-family             : 'Microsoft YaHei', sans-serif;
  -webkit-font-smoothing  : antialiased;
  -moz-osx-font-smoothing : grayscale;
  color                   : #333;
}
</style>
