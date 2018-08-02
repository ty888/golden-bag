<template>
  <div class="workbench">
    <div class="header">
      <div class="img">
        <img src="../assets/avatar.gif" alt="">
      </div>
      <div class="info">
        <h3 class="name">hello，{{me.name}}！</h3>
        <div class="disc">
          <span>22岁</span>
          <span>{{me.gender === 'WOMAN' ? '男' : '女'}}</span>
          <span>{{me.department && me.department.name}}</span>
        </div>
      </div>
      <div class="count_down">
        <div class="evaluate_btn">
          <el-button
            @click="selfEvaluation"
            type="primary"
            plain
            :disabled="isSubmit"
          >
            {{!isSubmit ? '季度自评' : '本季度已经自评'}}
          </el-button>
        </div>
        <div>离下个季度发奖金还剩<span class="time">43</span>天</div>
      </div>
    </div>
    <div class="body">
      <img src="../assets/index.png" alt="">
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapState } = createNamespacedHelpers('me');

export default {
  name: 'WorkBench',
  methods: {
    selfEvaluation() {
      this.$router.push({ name: 'self_evaluation' });
    },
  },
  computed: {
    ...mapState([
      'me',
      'currentUserTemplate',
    ]),
    currentUserTemplate() {
      return this.$store.state.user.currentUserTemplate;
    },
    isSubmit() {
      return this.$store.state.me.isSubmit;
    },
  },
  created() {
    this.$store.dispatch('user/getCurrentUserTemplate');
  },
};
</script>

<style lang="less" scoped>
.workbench{
  height: 100%;
  >.header{
    background-color: #fff;
    padding: 30px 40px;
    width: 100%;
    position: relative;
    overflow: hidden;
    >.img{
      width: 72px;
      height: 72px;
      border-radius: 100%;
      float: left;
      overflow: hidden;
      >img{width: 100%;height: 100%;}
    }
    >.info{
      padding-left: 92px;
      >h3.name{
        font-size: 20px;
        line-height: 28px;
        font-weight: 500;
        color: rgba(0,0,0,.85);
        margin-bottom: 12px;
        padding-top: 3px;
        margin-top: 0;
      }
      >.disc{
        >span{
          font-size: 14px;
          color: rgba(0,0,0,.45);
          margin-right: 7px;
        }
      }
    }
    >.count_down{
      position: absolute;
      top: 50%;
      right: 80px;
      font-size: 18px;
      transform: translateY(-50%);
      span.time{
        font-size: 36px;
        padding: 8px 6px;
        margin: 0 8px;
        color: #3999da;
      }
      >.evaluate_btn{
        position: absolute;
        bottom: -5px;
        left: -150px;
      }
    }
  }
}
.body{
  background-color: #e3e3e3;
  height: calc(100% - 132px);
  >img{
    display: block;
    width: 500px;
    margin: 0 auto;
  }
}
</style>

