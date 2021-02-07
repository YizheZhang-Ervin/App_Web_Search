<template>
  <div id="app">
    <EGHome />
  </div>
</template>

<script>
import EGHome from './components/index.vue';
export default {
  name: 'App',
  components: {
    EGHome
  }
}
</script>

<style>
/* 改全局样式 */
*{
    margin:0;
    font-family:"Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
</style>