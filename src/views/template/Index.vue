<template>
  <div class="template_list">
    <main-header title="模板管理">
      <div slot="right">
        <el-button icon="el-icon-plus" @click="onAdd" type="primary">新建模板</el-button>
      </div>
    </main-header>
    <div class="right_page main">
      <div class="year_list">
        <h2 class="title">2018年</h2>
        <TemplateItem title="第一季度" />
        <TemplateItem title="第二季度" />
      </div>
      <div class="year_list">
        <h2 class="title">2017年</h2>
        <TemplateItem title="第一季度" />
        <TemplateItem title="第二季度" />
        <TemplateItem title="第三季度" />
        <TemplateItem title="第四季度" />
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader.vue';
import TemplateItem from '@/components/template/TemplateItem.vue';

export default {
  name: 'TemplateList',
  components: {
    MainHeader, TemplateItem,
  },
  methods: {
    onAdd() {
      this.$router.push({ name: 'template.create' });
    },
  },
};
</script>

<style lang="less" scoped>
.main{
  overflow: hidden;
  >.year_list{
    overflow: hidden;
    margin-bottom: 15px;
    >h2.title{
      margin: 0 0 15px 15px;
      font-size: 18px;
      color: #444;
    }
  }
}
</style>
