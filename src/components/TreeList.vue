<template>
  <div class="tree_list">
    <h2 class="title">{{title}}</h2>
    <el-tree
      v-loading="loading"
      :data="data"
      default-expand-all
      :props="{
        label: 'name',
        value: 'id',
      }"
      @current-change="getDetail"
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click.stop="() => append(data)">
            添加
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click.stop="() => remove(data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  name: 'TreeList',
  props: {
    data: Array,
    title: String,
  },
  data() {
    return {
    };
  },
  methods: {
    getDetail(data) {
      this.$emit('getDetail', data.id);
    },
    append(data) {
      this.$emit('append', data);
    },
    remove(data) {
      this.$emit('remove', data);
    },
  },
  computed: {
    loading() {
      return this.$store.state.loading.loadings.departmentList;
    },
  },
};
</script>

<style lang="less">
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.tree_list{
  height: 100%;
  width: 300px;
  padding: 20px;
  background-color: #fff;
  >h2.title{
    font-size: 18px;
    color: #444;
    text-align: center;
    margin: 0;
    margin-bottom: 20px;
  }
}
</style>

