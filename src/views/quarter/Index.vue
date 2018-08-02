<template>
  <div class="role">
    <main-header title="季度管理"></main-header>
    <div class="right_page">
      <data-table
        :columns="columns"
        :dataSource="quarterList"
        :loading="loading"
        @onEdit="onEdit"
        :isDisable="isDisable"
        :pageMeta="quarterMeta"
        @pageChange="pageChange"
        @pageSizeChange="pageChange"
      />
    </div>
    <el-dialog :title="isCreate === true ? '创建' : '更新'" :visible.sync="showAdd">
      <el-form
        :model="theQuarter"
        label-width="100px"
        label-position="left"
        class="form">
        <el-form-item label="季度名称">
          <el-input v-model="theQuarter.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="季度开始时间">
          <el-date-picker
            v-model="theQuarter.startDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="季度考核时间">
          <el-date-picker
            v-model="theQuarter.startAssessmentDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="季度单价">
          <el-input v-model="theQuarter.price" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmint">
          {{isCreate === true ? '创建' : '更新'}}
        </el-button>
        <el-button @click="showAdd = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import DataTable from '@/components/DataTable';
import MainHeader from '@/components/MainHeader.vue';

const { mapActions, mapState } = createNamespacedHelpers('quarter');

export default {
  components: {
    DataTable, MainHeader,
  },
  data() {
    return {
      showAdd: false,
      isCreate: true,
      isDisable: true,
      theQuarter: {},
      columns: [
        {
          label: '季度名称',
          render(h, params) {
            return (
              <span>{params.name}
              { params.currentQuarter && <el-tag style={{ marginLeft: '10px' }} size="mini" type="danger">当前</el-tag> }</span>
            );
          },
        },
        { prop: 'price', label: '单价/分', width: 120 },
        {
          label: '季度开始日期',
          render(h, params) {
            return <span>{params.startDate && params.startDate.slice(0, 10)}</span>;
          },
        },
        {
          label: '开始考核日期',
          render(h, params) {
            return (
              <span>{params.startAssessmentDate && params.startAssessmentDate.slice(0, 10)}</span>);
          },
        },
      ],
    };
  },
  computed: {
    ...mapState([
      'quarterList',
      'quarterMeta',
      'currentQuarter',
    ]),
    loading() {
      return this.$store.state.loading.loadings.quarterList;
    },
  },
  created() {
    this.getQuarterList(this.$route.query);
  },
  methods: {
    ...mapActions([
      'getQuarterList',
      'getQuarter',
      'modifyQuarter',
    ]),
    onSubmint() {
      if (this.isCreate) {
        this.addQuarter(this.theQuarter).then(() => {
          this.getQuarterList();
          this.$message({
            type: 'success',
            message: '创建成功!',
          });
          this.showAdd = false;
        });
      } else {
        this.modifyQuarter(this.theQuarter).then(() => {
          this.$message({
            type: 'success',
            message: '更新成功!',
          });
          this.showAdd = false;
        });
      }
    },
    onEdit(quarter) {
      this.isCreate = false;
      this.showAdd = true;
      this.getQuarter(quarter.id).then(() => {
        this.theQuarter = this.currentQuarter;
      });
    },
    pageChange(params) {
      this.getQuarterList(params);
    },
  },
};
</script>

<style lang="less" scoped>
// .batch_bar, .filter_bar{
//   float: left;
//   margin-right: 5px;
// }
.form{
  width: 400px;
  margin: 0 auto;
}
</style>

