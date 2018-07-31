<template>
  <div class="direct_manager">
    <main-header title="直接经理评价"></main-header>
    <div class="right_page">
      <data-table
        :columns="columns"
        :dataSource="directManagerList"
        :loading="loading"
        :pageMeta="directManagerMeta"
        @pageChange="pageChange"
        @pageSizeChange="pageChange"
        :action="renderBtn"
      />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import DataTable from '@/components/DataTable';
import MainHeader from '@/components/MainHeader.vue';

const { mapActions, mapState } = createNamespacedHelpers('audit');

export default {
  name: 'DirectManager',
  components: {
    DataTable, MainHeader,
  },
  data() {
    return {
      columns: [
        { prop: 'uname', label: '姓名', width: 120 },
        {
          label: '性别',
          render(h, params) {
            return params.gender === 'WOMAN' ? <span>女</span> : <span>男</span>;
          },
        },
        { prop: 'time_coefficient', label: '时间系数' },
        { prop: 'total_self_score', label: '自评得分' },
        {
          label: '状态',
          render(h, params) {
            const stateMap = {
              SUBMITTED: {
                type: 'danger',
                title: '已提交',
              },
              DIRECT_MANAGER_EVALUATED: {
                type: 'danger',
                title: '直接经理已评价',
              },
              INDIRECT_MANAGER_RECHECK: {
                type: 'danger',
                title: '间接经理已审核',
              },
              FINISHED: {
                type: 'danger',
                title: '已完成',
              },
            };
            return (<span><el-tag type={stateMap[params.status].type}>
              {stateMap[params.status].title}
            </el-tag></span>);
          },
        },
      ],
    };
  },
  computed: {
    ...mapState([
      'directManagerList',
      'directManagerMeta',
    ]),
    loading() {
      return this.$store.state.loading.loadings.auditList;
    },
    renderBtn() {
      const self = this;
      return {
        label: '操作',
        render(h, params) {
          return (
            <el-button
              size="small"
              type="primary"
              on-click={() => self.directEvaluation(params)}
            >评价打分</el-button>
          );
        },
      };
    },
  },
  methods: {
    ...mapActions([
      'getDirectManagerList',
    ]),
    pageChange(params) {
      this.getDirectManagerList(params);
    },
    directEvaluation(res) {
      this.$router.push({ name: 'direct_evaluation', params: { recordId: res.id } });
    },
  },
  created() {
    this.getDirectManagerList();
  },
};
</script>
