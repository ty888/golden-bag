<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <el-breadcrumb-item
      v-for="(item, index) in currentPath"
      :key="index"
      :to="!item.isMain && {name: item.name}"
    >
      {{item.title}}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    currentPath: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style scoped lang="less">
  .breadcrumb{
    line-height: 60px;
  }
</style>
