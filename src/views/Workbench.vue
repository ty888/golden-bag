<template>
  <div class="workbench">
    <div class="header">
      <div class="img">
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532432586518&di=280d14ead1ac0242e13d8bb51dce63d4&imgtype=0&src=http%3A%2F%2Fwww.btc38.com%2Fuploadfile%2F2015%2F0326%2F20150326042232117.png" alt="">
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
            type="primary" plain>季度自评</el-button>
        </div>
        <div>离下个季度发奖金还剩<span class="time">43</span>天</div>
      </div>
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
    ]),
  },
};
</script>

<style lang="less" scoped>
.workbench{
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
        left: -120px;
      }
    }
  }
}
</style>

