<template>
  <div class="department">
    <main-header title="部门管理">
    </main-header>
    <div class="left">
      <TreeList
        title="部门树形图"
        :data="departmentList"
        @getDetail="getDetail"
        @remove="remove"
        @append="append"
      />
    </div>
    <div class="right">
      <div class="from">
        <el-form
          label-position="left"
          label-width="80px"
        >
          <el-form-item prop="name" label="部门名称">
            <el-input v-model="theDepartment.name" placeholder="请输入部门" type="text"></el-input>
          </el-form-item>
          <el-form-item prop="departmentIds" label="所属部门">
            <el-cascader
              v-model="theDepartment.parentIds"
              :props="{
                label: 'name',
                value: 'id',
              }"
              :options="departmentList"
              change-on-select
            ></el-cascader>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">
              {{isCreate === true ? '创建' : '更新'}}
            </el-button>
            <!-- <el-button @click="onCancel">取消</el-button> -->
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader.vue';
import TreeList from '@/components/TreeList.vue';
import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapState } = createNamespacedHelpers('department');


export default {
  name: 'department',
  components: {
    MainHeader, TreeList,
  },
  data() {
    return {
      theDepartment: {},
      isCreate: true,
    };
  },
  computed: {
    ...mapState([
      'departmentList',
      'currentDepartment',
    ]),
  },
  watch: {
    currentDepartment() {
      this.theDepartment = this.currentDepartment;
    },
  },
  methods: {
    ...mapActions([
      'getDepartmentList',
      'getDepartment',
      'deleteDepartment',
      'addDepartment',
      'modifyDepartment',
    ]),
    submit() {
      if (this.isCreate === true) {
        this.addDepartment(this.theDepartment).then(() => {
          this.$message({
            type: 'success',
            message: '创建成功!',
          });
          this.getDepartmentList();
        });
      } else {
        this.modifyDepartment(this.theDepartment).then(() => {
          this.getDepartmentList();
          this.$message({
            type: 'success',
            message: '更新成功!',
          });
        });
      }
    },
    getDetail(id) {
      this.isCreate = false;
      this.getDepartment(id);
    },
    remove(department) {
      this.deleteDepartment(department.id).then(() => {
        this.getDepartmentList();
        this.$message({
          type: 'success',
          message: '删除成功!',
        });
      });
    },
    append(department) {
      this.theDepartment = {};
      this.isCreate = true;
      this.theDepartment.parentIds = department.parentIds;
      this.theDepartment.parentIds.push(department.id);
    },
  },
  created() {
    this.getDepartmentList();
    this.theDepartment = this.currentDepartment;
  },
};
</script>

<style lang="less" scoped>
.department{
  height: calc(100% - 60px);
  overflow: hidden;
  >.left{
    margin-top: 20px;
    margin-left: 20px;
    float: left;
    height: calc(100% - 80px);
    border-radius: 5px;
    background-color: #fff;
    overflow: hidden;
  }
  >.right{
    float: right;
    background-color: #fff;
    margin-top: 20px;
    margin-right: 20px;
    border-radius: 5px;
    width: calc(100% - 360px);
    height: calc(100% - 80px);
    padding: 40px 0;
    >.from{
      width: 50%;
      margin: 0 auto;
    }
  }
}
</style>

