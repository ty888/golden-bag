<template>
  <div class="app">
    <Main />
  </div>
</template>
<script>
import Main from './views/Main.vue';

export default {
  components: { Main },
  data() {
    return {
    };
  },
};
</script>

<style lang="less">
  *{box-sizing: border-box;}
  html,body{
    background: #f0f2f5;
    overflow: hidden;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei";
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
  .el-submenu [class^=ion-md-],.el-menu-item [class^=ion-md-]{
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    display: inline-block;
    text-align: center;
    font-size: 18px;
  }
  .right_page{
    padding: 20px;
  }
</style>
