<template>
  <header class="header_bar">
    <logo class="logo" />
    <slot></slot>
    <div class="right_info">
      <slot name="right"></slot>
    </div>
  </header>
</template>

<script>
import Logo from './Logo.vue';

export default {
  name: 'HeaderBar',
  components: {
    Logo,
  },
};
</script>

<style scoped lang="less">
  .header_bar{
    position: relative;
    z-index: 1;
    height: 60px;
    background: #fff;
    line-height: 60px;
    padding: 0 10px;
    box-shadow: 0 1px 2px rgba(0,0,0,.1);
    display: flex;
    align-items: center;
    .logo{
      padding-left: 15px;
      margin-right: 10px;
    }
    .right_info{
      position: absolute;
      right: 20px;
    }
  }
</style>
