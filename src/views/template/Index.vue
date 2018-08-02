<template>
  <div class="template_list">
    <main-header title="模板管理"></main-header>
    <div class="right_page main">
      <el-tabs tab-position="top" v-model="activeName">
        <el-tab-pane label="员工模版" name="staff">
          <div class="year_list" v-for="(template, key) of staffTemplateList" :key='key'>
            <h2 class="title">{{key}}</h2>
            <TemplateItem
              :id="item.id"
              :title="item.name"
              v-for="(item, index) in template"
              :key="index"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="经理模版" name="manager">
          <div class="year_list" v-for="(template, key) of managerTemplateList" :key='key'>
            <h2 class="title">{{key}}</h2>
            <TemplateItem
              :id="item.id"
              :title="item.name"
              v-for="(item, index) in template"
              :key="index"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
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
  data() {
    return {
      activeName: 'staff',
    };
  },
  components: {
    MainHeader, TemplateItem,
  },
  methods: {
    ...mapActions([
      'getStaffTemplateList',
      'getManagerTemplateList',
    ]),
  },
  created() {
    this.getStaffTemplateList();
    this.getManagerTemplateList();
  },
  computed: {
    ...mapState([
      'staffTemplateList',
      'managerTemplateList',
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
