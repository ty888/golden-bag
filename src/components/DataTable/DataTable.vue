<template>
  <div class="data_table">
    <div class="table_wrapper">
      <el-table
        v-loading="loading"
        :data="dataSource"
        @selection-change="onSelect">
        <template v-for="(col, index) in columns">
          <el-table-column :key="index" v-bind="col" v-if="!col.render && !col.expandCols"/>
          <el-table-column :key="index"
            v-else-if="col.render || col.type === 'expand'" v-bind="col">
            <template slot-scope="scope">
              <table-render-item :render="col.render" :params="scope.row" />
            </template>
          </el-table-column>
        </template>
        <el-table-column
          v-if="!action"
          label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button size="small" type="primary" @click="onEdit(scope.row)">编辑</el-button>
              <el-button size="small" type="danger" @click="onDel(scope.row)">删除</el-button>
            </el-button-group>
          </template>
        </el-table-column>
        <el-table-column v-else>
          <template slot-scope="scope">
            <table-render-item :render="action.render" :params="scope.row" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page_wrapper" v-if="pageMeta">
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="pageCurrentChange"
        :current-page="pageMeta.number"
        :page-sizes="[10, 15, 20, 30]"
        :page-size="pageMeta.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageMeta.totalElements">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import TableRenderItem from './TableRenderItem.vue';

export default {
  name: 'DataTable',
  props: {
    loading: {
      type: Boolean,
      default() {
        return false;
      },
    },
    dataSource: {
      type: Array,
      default() {
        return [];
      },
    },
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    action: Object,
    pageMeta: Object,
  },
  components: { TableRenderItem },
  methods: {
    onEdit(item) {
      this.$emit('onEdit', item);
    },
    onDel(item) {
      this.$emit('onDel', item);
    },
    onSelect(val) {
      this.$emit('onSelect', val);
    },
    updateQuery(params) {
      this.$router.replace({
        name: this.$route.name,
        params: this.$route.params,
        query: {
          ...this.$route.query,
          ...params,
        },
      });
    },
    pageSizeChange(pageSize) {
      const params = {
        page: this.pageMeta.current_page,
        per_page: pageSize,
      };
      this.updateQuery(params);
      this.$emit('pageSizeChange', params);
    },
    pageCurrentChange(currentPage) {
      const params = {
        page: currentPage,
        per_page: this.pageMeta.per_page,
      };
      this.updateQuery(params);
      this.$emit('pageChange', params);
    },
  },
};
</script>

<style lang="less">
  .data_table {
    .table_wrapper {
      padding: 10px 10px 0 10px;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 1px 1px 2px #dfe5ed;
    }
    .page_wrapper{
      margin: 30px 0;
      text-align: right;
    }
    .demo-table-expand {
      font-size: 0;
      width: calc(~'100% - 55px');
      margin-left: 55px;
    }
    .demo-table-expand label {
      width: 120px;
      color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
  }
</style>
