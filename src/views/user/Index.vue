<template>
  <div class="role">
    <main-header title="用户管理">
      <div slot="right">
        <el-button icon="el-icon-plus" @click="onAdd" type="primary">新建用户</el-button>
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
        :dataSource="userList"
        :loading="loading"
        @onDel="onDel"
        @onEdit="onEdit"
        :pageMeta="userMeta"
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
// import FilterBar from '@/components/FilterBar.vue';

const { mapActions, mapState } = createNamespacedHelpers('user');

export default {
  components: {
    DataTable, MainHeader,
    // FilterBar,
  },
  data() {
    return {
      columns: [
        { prop: 'name', label: '姓名', width: 80 },
        {
          label: '性别',
          render(h, params) {
            return params.gender === 'WOMAN' ? <span>女</span> : <span>男</span>;
          },
        },
        { prop: 'phone', label: '手机号' },
        { prop: 'rankCoefficient', label: '职级系数', width: 120 },
        {
          label: '入职时间',
          render(h, params) {
            return <span>{params.entryDate && params.entryDate.slice(0, 10)}</span>;
          },
        },
        { prop: 'department.name', label: '所属部门', width: 130 },
        { prop: 'directManager.name', label: '直接经理', width: 130 },
        { prop: 'indirectManager.name', label: '间接经理', width: 130 },
      ],
    };
  },
  computed: {
    ...mapState([
      'userList',
      'userMeta',
    ]),
    loading() {
      return this.$store.state.loading.loadings.userList;
    },
    // categoriesList() {
    //   return this.$store.state.categories.categoriesList;
    // },
    // filters() {
    //   return [
    //     {
    //     //   key: '',
    //       placeholder: '按商品名称筛选',
    //     //   options: '',
    //     },
    //     {
    //       key: 'category_id',
    //       placeholder: '按商品类别筛选',
    //       options: this.categoriesList,
    //     },
    //     {
    //     //   key: '',
    //       placeholder: '按商品ID筛选',
    //     //   options: '',
    //     },
    //   ];
    // },
  },
  mounted() {
  },
  created() {
    this.getUserList(this.$route.query);
    // this.$store.dispatch('categories/getCategoriesList');
  },
  methods: {
    ...mapActions([
      'getUserList',
      'deleteUser',
    ]),
    onAdd() {
      this.$router.push({ name: 'user.create' });
    },
    // onSelect(params) {
    //   this.multipleSelection = params.map(param => param.id);
    // },
    // onFilterChange() {
    //   this.getGoodList(this.$route.query);
    // },
    onEdit({ id }) {
      this.$router.push({ name: 'user.edit', params: { userId: id } });
    },
    onDel(user) {
      this.deleteUser(user.id).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!',
        });
      });
    },
    pageChange(params) {
      this.getUserList(params);
    },
  },
};
</script>

<style lang="less" scoped>
// .batch_bar, .filter_bar{
//   float: left;
//   margin-right: 5px;
// }
</style>
