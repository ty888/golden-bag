<template>
  <el-container class="main_wrapper">
    <el-header>
      <header-bar class="header">
        <!-- <i @click="toggleCollapse" class="el-icon-menu side_switch"></i> -->
        <template slot="right">
          <FullScreen v-model="isFull" />
          <UserPanel />
        </template>
      </header-bar>
    </el-header>
    <el-container>
      <el-aside class="side_menu_aside" width="auto">
        <side-menu :menu-list="menuList" :isCollapse="isCollapse"/>
      </el-aside>
      <el-container>
        <div class="el_main">
          <div class="page_header">
            <breadcrumb :currentPath="currentPath"/>
          </div>
          <router-view class="main"/>
        </div>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import SideMenu from '@/components/SideMenu.vue';
import HeaderBar from '@/components/HeaderBar.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import FullScreen from '@/components/header/FullScreen.vue';
import UserPanel from '@/components/header/UserPanel.vue';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Main',
  data() {
    return {
      isFull: false,
    };
  },
  components: {
    SideMenu, HeaderBar, Breadcrumb, FullScreen, UserPanel,
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
    overflow: hidden;
  }
  .el_main{
    width: 100%;
    overflow: scroll;
    .page_header{
      background-color: #fff;
      padding-left: 30px;
    }
  }
  .main {
    margin: 0 auto;
  }
</style>
