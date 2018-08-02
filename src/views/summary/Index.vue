<template>
  <div class="direct_manager">
    <main-header title="汇总">
      <div slot="right">
        <el-button
          v-if="multipleSelection.length > 0"
          @click="exportRecs"
          type="primary"
        >
          导出选中数据
        </el-button>
        <el-button @click="showExport = true" plain type="primary">导出指定数据</el-button>
        <el-button @click="exportCurrent" plain type="success">导出当前季度</el-button>
      </div>
    </main-header>
    <div class="right_page">
      <data-table
        :columns="columns"
        :dataSource="summaryList"
        :loading="loading"
        @onSelect="onSelect"
        :pageMeta="summaryMeta"
        @pageChange="pageChange"
        @pageSizeChange="pageChange"
        :action="renderBtn"
      />
    </div>
    <el-dialog width="40%" title="选择需要导出的季度" :visible.sync="showExport">
      <el-checkbox-group v-model="quarterIds" size="small">
        <el-checkbox
          v-for="item in quarterList"
          :key="item.id"
          v-model="quarterIds"
          :label="item.id"
          border>
          {{ item.name }}
        </el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showExport = false">取 消</el-button>
        <el-button type="primary" @click="exportQuarters">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import DataTable from '@/components/DataTable';
import MainHeader from '@/components/MainHeader.vue';

const { mapActions, mapState } = createNamespacedHelpers('summary');

export default {
  name: 'Summary',
  components: {
    DataTable, MainHeader,
  },
  data() {
    return {
      showExport: false,
      multipleSelection: [],
      quarterIds: [],
      columns: [
        { type: 'selection', width: 55 },
        { prop: 'user.name', label: '姓名', width: 120 },
        {
          label: '性别',
          render(h, params) {
            return params.gender === 'WOMAN' ? <span>女</span> : <span>男</span>;
          },
        },
        { prop: 'totalManagerScore', label: '经理评分' },
        { prop: 'totalSelfScore', label: '自评得分' },
        { prop: 'rankCoefficient', label: '职级系数' },
        { prop: 'timeCoefficient', label: '时间系数' },
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
                type: 'success',
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
      'summaryList',
      'summaryMeta',
    ]),
    renderBtn() {
      const self = this;
      return {
        label: '操作',
        render(h, params) {
          return (
            <el-button
              size="small"
              type="primary"
              on-click={() => self.exportOne(params)}
            >导出</el-button>
          );
        },
      };
    },
    loading() {
      return this.$store.state.loading.loadings.summaryList;
    },
    quarterList() {
      return this.$store.state.quarter.quarterList;
    },
  },
  methods: {
    ...mapActions([
      'getSummaryList',
      'exportRecord',
      'exportQuarterRecord',
      'exportRecords',
    ]),
    onSelect(rows) {
      this.multipleSelection = rows.map(element => element.id);
    },
    pageChange(params) {
      this.getSummaryList(params);
    },
    // 导出指定一条记录
    exportOne(params) {
      // this.exportRecord(params.id);
      window.location = `/assessments/export/${params.id}`;
    },
    // 导出当前季度
    exportCurrent() {
      window.location = '/assessments/batch_export/byquarters?quarer_ids=1';
    },
    // 导出指定季度记录
    exportQuarters() {
      window.location = `/assessments/batch_export/byquarters?quarer_ids=${this.quarterIds.join(',')}`;
    },
    // 导出指定多条数据
    exportRecs() {
      window.location = `/assessments/batch_export/byquarters?quarer_ids=${this.multipleSelection.join(',')}`;
    },
  },
  created() {
    this.getSummaryList();
    this.$store.dispatch('quarter/getQuarterList');
  },
};
</script>
