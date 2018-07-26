<template>
  <div class="input_tr">
    <!-- <div class="mask" v-show="isRead" @dblclick="canInput">于瘠薄</div> -->
    <textarea
      @blur="() => readOnly = true"
      :readonly="readOnly"
      @dblclick="onDblClick"
      @input="input"
      v-model="currentValue"
      v-if="type === 'textarea'"
    ></textarea>
    <input
      v-else
      @blur="() => readOnly = true"
      :readonly="readOnly"
      @dblclick="onDblClick"
      @input="input"
      v-model="currentValue"
    />
    <div class="edit_icon">
      <icon type="create" size="16" />
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue';

export default {
  name: 'InputTr',
  components: {
    Icon,
  },
  props: {
    value: [String, Number],
    type: {
      type: String,
      default() {
        return 'input';
      },
    },
  },
  watch: {
    value(val) {
      this.currentValue = val;
    },
  },
  data() {
    return {
      readOnly: true,
      currentValue: this.value,
    };
  },
  methods: {
    onDblClick(e) {
      const len = e.target.value.length;
      e.target.setSelectionRange(len, len);
      this.readOnly = false;
    },
    input() {
      this.$emit('input', this.currentValue);
    },
  },
  mounted() {
    this.$el.style.height = `${this.$el.parentElement.offsetHeight}px`;
  },
};
</script>

<style lang="less" scoped>
.input_tr{
  width: 100%;
  height: 100%;
  position: relative;
  &:hover>.edit_icon{
    opacity: 1;
  }
  >textarea, >input{
    outline: none;
    resize: none;
    border: none;
    width: 100%;
    height: 100%;
    text-align: center;
    padding: 0;
    border: 1px solid transparent;
    cursor: pointer;
    transition: all .1s;
    &:not([readonly]){
      position: relative;
      z-index: 100;
      // box-shadow: 1px 0px 3px 4px rgba(82, 146, 247, 0.25);
      box-shadow: 0px 3px 13px 2px rgba(82, 146, 247, 0.25);
    }
  }
  >textarea{
    padding: 10px;
  }
  >.edit_icon{
    opacity: 0;
    position: absolute;
    top: 0;
    right: 0;
    transition: opacity .3s;
  }
}
</style>
