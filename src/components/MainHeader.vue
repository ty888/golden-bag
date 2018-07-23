<template>
  <div class="main_header">
    <h1 class="title">{{title}}</h1>
    <slot></slot>
    <div class="right_option">
      <slot name="right"></slot>
    </div>
    <div class="bottom">
      <slot class="bottom_left" name="bottom_left"></slot>
      <slot class="bottom_right" name="bottom_right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainHeader',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="less">
  .main_header {
    margin-bottom: 15px;
    > .title {
      display: inline-block;
      font-weight: 400;
      line-height: 1;
      font-size: 20px;
      margin: 20px 0 25px;
    }
    > .right_option {
      float: right;
      margin-top: 10px;
    }
    > .bottom{
      overflow: hidden;
      line-height: 36px;
      .bottom_left{
        float: left;
      }
      .bottom_right{
        float: right;
      }
    }
  }
</style>
