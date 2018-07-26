<template>
  <div class="temp_main">
    <main-header title="模板管理">
      <!-- <div slot="right">
        <el-button icon="el-icon-plus" type="primary">新建模板</el-button>
      </div> -->
    </main-header>
    <div class="right_page">
      <Template />
    </div>
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader.vue';
import Template from '@/components/template/Template.vue';

export default {
  name: 'TemplateMain',
  components: {
    Template, MainHeader,
  },
};
</script>

<style lang="less" scoped>

</style>

