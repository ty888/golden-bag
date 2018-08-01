<template>
  <div class="role">
    <main-header title="角色管理">
      <div slot="right">
        <el-button icon="el-icon-plus" @click="onAdd" type="primary">新建角色</el-button>
      </div>
      <div class="bottom_left" slot="bottom_left">
        <div class="batch_bar">
          <div class="batch_bar">
            <!-- <BatchBar :data="batchData" :checkList="multipleSelection"
            @batchDel="batchDel"/> -->
          </div>
        </div>
        <!-- <div class="filter_bar">
          <FilterBar useQuery @change="onFilterChange" :filters="filters"/>
        </div> -->
      </div>
      <div class="bottom_right" slot="bottom_right">
        <!-- <export event="export" @export="exportClass"></export> -->
      </div>
    </main-header>
    <div class="right_page">
      <data-table
        :columns="columns"
        :dataSource="roleList"
        :loading="loading"
        @onDel="onDel"
        @onEdit="onEdit"
        :pageMeta="roleMeta"
        @pageChange="pageChange"
        @pageSizeChange="pageChange"
      />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import DataTable from '@/components/DataTable';
import MainHeader from '@/components/MainHeader.vue';

const { mapActions, mapState } = createNamespacedHelpers('role');

export default {
  components: {
    DataTable, MainHeader,
  },
  data() {
    return {
      columns: [
        { prop: 'id', label: '#', width: 80 },
        { prop: 'name', label: '名称', width: 130 },
        { prop: 'description', label: '描述' },
        // {
        //   label: '性别',
        //   render(h, params) {
        //     return params.gender === 'WOMAN' ? <span>女</span> : <span>男</span>;
        //   },
        // },
        // { prop: 'rankCoefficient', label: '职级系数', width: 120 },
        // {
        //   label: '入职时间',
        //   render(h, params) {
        //     return <span>{params.entryDate && params.entryDate.slice(0, 10)}</span>;
        //   },
        // },
        // { prop: 'department.name', label: '所属部门', width: 130 },
        // { prop: 'directManager.name', label: '直接经理', width: 130 },
        // { prop: 'indirectManager.name', label: '间接经理', width: 130 },
      ],
    };
  },
  computed: {
    ...mapState([
      'roleList',
      'roleMeta',
    ]),
    loading() {
      return this.$store.state.loading.loadings.roleList;
    },
  },
  mounted() {
  },
  created() {
    this.getRoleList(this.$route.query);
  },
  methods: {
    ...mapActions([
      'getRoleList',
      'deleteRole',
    ]),
    onAdd() {
      this.$router.push({ name: 'role.create' });
    },
    onEdit({ id }) {
      this.$router.push({ name: 'role.edit', params: { roleId: id } });
    },
    onDel(role) {
      this.deleteRole(role.id).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!',
        });
      });
    },
    pageChange(params) {
      this.getRoleList(params);
    },
  },
};
</script>

<style lang="less" scoped>
</style>
