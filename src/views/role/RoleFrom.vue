<template>
  <div class="role_from">
    <main-header :title="`${actionLabel}角色`"></main-header>
    <div class="right_page from_main">
      <div class="from_body">
        <el-form
          class="form"
          ref="roleForm"
          label-width="100px"
          :model="roleClone"
          :rules="rules"
          label-position="left"
        >
          <el-form-item prop="name" label="名称">
            <el-input v-model="roleClone.name" placeholder="输入角色姓名" type="text"></el-input>
          </el-form-item>
          <el-form-item prop="description"  label="描述">
            <el-input
              type="textarea"
              v-model="roleClone.description"
              placeholder="输入角色描述"></el-input>
          </el-form-item>
          <el-form-item
            :label="key"
            v-for="(permission, key) in allPermissionList" :key="key">
            <el-checkbox-group v-model="roleClone.permissions" size="small">
              <el-checkbox-button
                :label="item.id"
                :key="index"
                v-for="(item, index) in permission"
                :name="item. moduleName">
                {{item.displayName}}
              </el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button
              @keyup.enter="onSubmit"
              @click="onSubmit"
              :loading="loading"
              type="primary"
            >
              {{actionLabel}}
            </el-button>
            <el-button @click="onCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader.vue';
// import http from '@/utils/http';
import clone from 'clone';
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions } = createNamespacedHelpers('role');

export default {
  name: 'RoleFrom',
  components: {
    MainHeader,
  },
  data() {
    return {
      roleClone: this.preprocessRole(clone(this.currentRole)),
    };
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.getRole(this.$route.params.roleId);
  },
  computed: {
    ...mapState([
      'currentRole',
      'permissionList',
      'permissionMeta',
    ]),
    allPermissionList() {
      const permissionList = {};
      Object.keys(this.permissionList).forEach((key) => {
        Object.keys(this.permissionList[key]).forEach((itemKey) => {
          permissionList[itemKey] = this.permissionList[key][itemKey];
        });
      });
      return permissionList;
    },
    actionLabel() {
      return this.$route.name === 'role.create' ? '添加' : '更新';
    },
    loading() {
      return this.$store.state.loading.loadings.role;
    },
    departments() {
      return this.$store.state.department.departmentList;
    },
    rules() {
      return {
        name: [
          { required: true, message: '请输入商品类型名称', trigger: 'blur' },
          {
            min: 1,
            max: 30,
            message: '长度在 1 到 30 个字符',
            trigger: 'blur',
          },
        ],
        description: [
          { required: true, message: '请输入商品类型名称', trigger: 'blur' },
        ],
      };
    },
  },
  watch: {
    currentRole() {
      this.roleClone = this.preprocessRole(clone(this.currentRole));
    },
    $route() {
      if (this.$route.name === 'role.edit') {
        this.getRole(this.$route.params.roleId);
      } else {
        this.roleClone = this.preprocessRole({});
      }
    },
  },
  methods: {
    ...mapActions([
      'modifyRole',
      'addRole',
      'getRermissionList',
      'getRole',
    ]),
    onSubmit() {
      this.roleClone.permissions = this.roleClone.permissions.map(item => ({ id: item }));
      this.$refs.roleForm.validate((passed) => {
        if (passed) {
          this[this.roleClone.id ? 'modifyRole' : 'addRole'](this.roleClone)
            .then(() => {
              this.$emit('success');
              this.$message.success(`${this.actionLabel}成功！`);
              this.$router.push({ name: 'role.index' });
            });
        }
      });
    },
    onCancel() {
      this.$emit('canceled');
    },
    preprocessRole(role = {}) {
      const preprocessRole = {
        ...role,
        permissions: this.permissionMeta ? this.permissionMeta.permissions : {},
      };
      return preprocessRole;
    },
  },
  created() {
    this.getRermissionList();
    if (this.$route.name === 'role.edit') {
      this.getRole(this.$route.params.roleId);
    } else {
      this.roleClone = this.preprocessRole({});
    }
  },
};
</script>

<style lang="less" scoped>
.from_body{
  background-color: #fff;
  padding: 40px;
  .form{
    width: 500px;
    margin: 0 auto;
  }
}
</style>
