<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
};
</script>

<style lang="less">
  html,body{
  background: #f0f0f0;
    overflow: hidden;
  }
  html,body,.app{
    width: 100%;
    height: 100%;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .el-submenu [class^=ion-md-] {
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    display: inline-block;
    text-align: center;
    font-size: 18px;
  }
</style>
