<template>
  <div class="side_menu_wrapper">
    <div class="switch_icon">
      <icon
        @click.native="toggleCollapse"
        :type="isCollapse !== true ? 'menu' : 'close'"
        class="side_switch"
        size="26"
      />
    </div>
    <el-menu
      :default-active="$route.name"
      class="side_menu"
      @select="(name) => $router.push({name})"
      :collapse="isCollapse"
      :collapse-transition="true"
    >
      <template v-for="menuItem in menuList">
        <el-menu-item
          v-if="menuItem.top"
          :key="menuItem.children[0].name"
          :index="menuItem.children[0].name"
        >
          <i v-if="menuItem.icon" :class="menuItem.icon"></i>
          <span>{{menuItem.children[0].title}}</span>
        </el-menu-item>
        <el-submenu
          v-else
          :key="menuItem.name"
          :index="menuItem.name"
        >
          <template slot="title">
            <i v-if="menuItem.icon" :class="menuItem.icon"></i>
            <span>{{menuItem.title}}</span>
          </template>
          <el-menu-item
            v-for="children in menuItem.children"
            :key="children.name"
            :index="children.name"
          >
            {{children.title}}
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue';
import { mapMutations } from 'vuex';

export default {
  name: 'SideMenu',
  components: {
    Icon,
  },
  props: {
    menuList: {
      type: Array,
      required: true,
    },
    isCollapse: {
      type: Boolean,
    },
  },
  methods: {
    ...mapMutations([
      'toggleCollapse',
    ]),
  },
};
</script>
<style scoped lang="less">
.side_menu {
  padding-top: 10px;
  &:not(.el-menu--collapse) {
    width: 180px;
  }
}
.switch_icon{
  height: 40px;
  text-align: center;
  background-color: #f9f9f9;
  i{line-height: 40px;}
}
</style>
