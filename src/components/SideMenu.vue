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
      <el-menu-item :route="{ name: 'workbench' }" index="workbench">
        <i class="ion-md-cube"></i>
        <span slot="title">工作台</span>
      </el-menu-item>
      <template v-for="parentMenu in menuList">
        <el-submenu :index="parentMenu.name" :key="parentMenu.name">
        <template slot="title">
          <i :class="rootRouter[parentMenu.name].icon"></i>
          <span>{{parentMenu.displayName}}</span>
        </template>
        <el-menu-item-group v-for="(manuItem, index) in parentMenu.children" :key="index">
          <template slot="title">{{manuItem.displayName}}</template>
          <el-menu-item
            v-if="appRouterMapping[`${parentMenu.name}.${manuItem.name}`] &&
             !route.path.includes(':')"
            v-for="route in appRouterMapping[`${parentMenu.name}.${manuItem.name}`]"
            :key="route.name"
            :index="route.name"
            :route="{ name: route.name }"
          >
          {{route.title}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Icon from '@/components/Icon.vue';
import { appRouterMapping } from '../router';

export default {
  name: 'SideMenu',
  components: {
    Icon,
  },
  props: {
    menuList: {
      type: Array,
      default() {
        return [];
      },
      required: true,
    },
    isCollapse: {
      type: Boolean,
    },
  },
  data() {
    return {
      appRouterMapping,
      rootRouter: {
        basic: { icon: 'ion-md-cube' },
        template_module: { icon: 'ion-md-albums' },
        assessment: { icon: 'ion-md-exit' },
      },
    };
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
    width: 200px;
  }
}
.switch_icon{
  height: 40px;
  text-align: center;
  background-color: #f9f9f9;
  i{line-height: 40px;}
}
</style>
