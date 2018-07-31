<template>
  <div class="template_list">
    <main-header title="模板管理">
      <div slot="right">
        <el-button icon="el-icon-plus" @click="onAdd" type="primary">新建模板</el-button>
      </div>
    </main-header>
    <div class="right_page main">
      <div class="year_list" v-for="(template, key) of templateList" :key='key'>
        <h2 class="title">{{key}}</h2>
        <TemplateItem
          :id="item.id"
          :title="item.name"
          v-for="(item, index) in template"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import MainHeader from '@/components/MainHeader.vue';
import TemplateItem from '@/components/template/TemplateItem.vue';

const { mapActions, mapState } = createNamespacedHelpers('template');

export default {
  name: 'TemplateList',
  components: {
    MainHeader, TemplateItem,
  },
  methods: {
    ...mapActions([
      'getTemplateList',
    ]),
    onAdd() {
      // this.$router.push({ name: 'template.create' });
      console.log(this.templateList);
    },
  },
  created() {
    this.getTemplateList();
  },
  computed: {
    ...mapState([
      'templateList',
    ]),
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
