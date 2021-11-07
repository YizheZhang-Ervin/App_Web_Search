<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 解决codediff错位问题 */
.d2h-wrapper,.d2h-code-side-line,.d2h-info{
  height: 18px;
}
/* 解决code每行都有滚动条的问题 */
.hljs{
  overflow: hidden;
}

</style>
