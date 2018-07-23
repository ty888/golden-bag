<template>
  <el-container class="main_wrapper">
    <el-header>
      <header-bar class="header">
        <!-- <i @click="toggleCollapse" class="el-icon-menu side_switch"></i> -->
        <breadcrumb :currentPath="currentPath"/>
        <template slot="right">
          <FullScreen v-model="isFull"/>
        </template>
      </header-bar>
    </el-header>
    <el-container>
      <el-aside class="side_menu_aside" width="auto">
        <side-menu :menu-list="menuList" :isCollapse="isCollapse"/>
      </el-aside>
      <el-container>
        <el-main>
          <router-view class="main"/>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import SideMenu from '@/components/SideMenu.vue';
import HeaderBar from '@/components/HeaderBar.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import FullScreen from '@/components/header/FullScreen.vue';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Main',
  data() {
    return {
      isFull: false,
    };
  },
  components: {
    SideMenu, HeaderBar, Breadcrumb, FullScreen,
  },
  computed: {
    ...mapState({
      menuList: state => state.app.menuList,
      currentPath: state => state.app.currentPath,
      isCollapse: state => state.app.isCollapse,
    }),
  },
  methods: {
    ...mapMutations([
      'toggleCollapse',
    ]),
  },
};
</script>

<style scoped lang="less">
  .main_wrapper {
    height: 100%;
  }

  .el-header {
    padding: 0;
    .side_switch {
      margin-right: 20px;
      color: #495060;
      font-size: 24px;
      cursor: pointer;
      transition: all .3s;
      &:hover{
        color: #409EFF;
      }
    }
    .roate90{transform: rotate(90deg);}
    .item{
      float: left;
      margin-right: 15px;
    }
  }

  .side_menu_aside {
    background-color: #fff;
  }

  .main {
    margin: 0 auto;
  }
</style>
