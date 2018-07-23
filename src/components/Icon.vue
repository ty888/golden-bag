<template>
    <i :class="classes" :style="styles"></i>
</template>
<script>
const prefixCls = 'icon';
export default {
  name: 'Icon',
  props: {
    type: {
      type: String,
      required: true,
    },
    size: [Number, String],
    color: {
      type: String,
      default: '#495060',
    },
  },
  computed: {
    classes() {
      return [prefixCls, `ion-md-${this.type}`];
    },
    styles() {
      const style = {};
      if (this.size) {
        style['font-size'] = `${this.size}px`;
      }
      if (this.color) {
        style.color = this.color;
      }
      return style;
    },
  },
};
</script>

<style lang="less" scoped>
i{
  cursor: pointer;
}
</style>
