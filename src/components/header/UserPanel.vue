<template>
  <div @mouseenter="mouseEnter" @mouseleave="mouseLeave" class="user_panel">
    <div class="user_avatar">
      <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532432586518&di=280d14ead1ac0242e13d8bb51dce63d4&imgtype=0&src=http%3A%2F%2Fwww.btc38.com%2Fuploadfile%2F2015%2F0326%2F20150326042232117.png" alt="" title="" />
    </div>
    <div class="user_profile">
      <span class="user_info">{{me.name}}</span>
    </div>
    <i class="icon el-icon-caret-bottom"></i>
    <transition name="fade">
      <div v-show="showActions" class="actions">
        <div class="arrow"></div>
        <a @click="logout" href="#">退出登陆</a>
      </div>
    </transition>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapState } = createNamespacedHelpers('me');
export default {
  name: 'UserPanel',
  data() {
    return {
      showActions: false,
      timer: null,
    };
  },
  computed: {
    ...mapState([
      'me',
    ]),
  },
  methods: {
    mouseEnter() {
      this.showActions = true;
      clearTimeout(this.timer);
      this.timer = null;
    },
    mouseLeave() {
      if (this.timer) {
        return;
      }
      this.timer = setTimeout(() => {
        this.showActions = false;
        this.timer = null;
      }, 300);
    },
    logout() {
      window.location = '/auth/logout';
    },
  },
};
</script>

<style scoped lang="less">
  .user_panel{
    display: flex;
    align-items: center;
    margin-top: 15px;
    margin-left: 40px;
    cursor: pointer;
    position: relative;
    .user_avatar{
      display: inline-block;
      overflow: hidden;
      width: 30px;
      height: 30px;
      margin-right: 12px;
      border-radius: 100%;
      line-height: 1;
      > img{
        width: 100%;
      }
    }
    .user_profile{
      flex-direction: column;
      display: flex;
      line-height: initial;
      >span{
        text-align: center;
        margin-bottom: 2px;
        color: #666;
        &.user_name{
          font-size: 13px;
        }
        &.user_info{
          font-size: 14px;
          color: rgb(153, 153, 153);
        }
      }
    }
    .icon{
      margin-left: 5px;
      font-size: 12px;
      color: #666;
    }
    .actions{
      position: absolute;
      z-index: 10;
      top: 65px;
      right: 0;
      width: 130px;
      padding: 5px 0;
      background: #fff;
      border-radius: 3px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.25), 0 0 1px rgba(0,0,0,0.35);
      > .arrow{
        position: absolute;
        top: -15px;
        right: 20px;
        &::after{
          content: '';
          display: block;
          width: 14px;
          height: 14px;
          background: #fff;
          transform: rotate(45deg) translate(6px, 6px);
          box-shadow: -1px -1px 1px -1px rgba(0,0,0,0.44);
        }
      }
      > p{
        margin: 13px 0 15px 0;
        line-height: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
      }
      .line{
        margin: 5px 0;
        background-color: rgba(0,0,0,.04);
        height: 1px;
      }
      > a{
        display: block;
        text-align: center;
        color: #333;
        text-decoration: none;
        font-size: 14px;
        line-height: 1;
        padding: 10px 0;
        &:hover{
          background-color: #f5f5f5;
        }
      }
    }
  }
</style>
