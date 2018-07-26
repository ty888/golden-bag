<template>
  <div class="template_item">
    <div class="box">
      <div class="pic"></div>
      <div class="disc">
        <h3 class="title">{{title}}</h3>
        <div class="operation">
          <span @click="see">查看</span>
          <span>编辑</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TemplateItem',
  props: {
    title: String,
  },
  methods: {
    see() {
      this.$router.push({ name: 'template.show' });
    },
  },
};
</script>

<style lang="less" scoped>

.template_item{
  width: 25%;
  padding: 0 10px;
  float: left;
  .box{
    border-radius: 5px;
    display: block;
    overflow: hidden;
    &:hover .operation{
      opacity: 1;
    }
  }
  .pic{
    width: 100%;
    height: 140px;
    margin-right: 20px;
    color: #fff;
    background-position: center;
    background-size: cover;
  }
  .disc{
    background-color: #fff;
    padding: 10px;
    position: relative;
    >h3.title{
      margin: 0;
      color: #777;
      font-size: 14px;
    }
    >.operation{
      position: absolute;
      top: 10px;
      right: 10px;
      transition: opacity .2s;
      opacity: 0;
      >span{
        font-size: 12px;
        margin-left: 10px;
        cursor: pointer;
        color: #409EFF;
      }
    }
  }
}
.template_item:nth-child(2) .pic{
  background-image: url('../../assets/chun.jpeg');
}
.template_item:nth-child(3) .pic{
  background-image: url('../../assets/xia.jpeg');
}
.template_item:nth-child(4) .pic{
  background-image: url('../../assets/qiu.jpeg');
}
.template_item:nth-child(5) .pic{
  background-image: url('../../assets/dong.jpeg');
}
// .theme1{
//   background: #74ebd5;
//   background: -webkit-linear-gradient(to right, #ACB6E5, #74ebd5);
//   background: linear-gradient(to right, #ACB6E5, #74ebd5);
// }
// .theme2{
//   background: #22c1c3;
//   background: -webkit-linear-gradient(to right, #fdbb2d, #22c1c3);
//   background: linear-gradient(to right, #fdbb2d, #22c1c3);
// }

// .theme3{
//   background: #B2FEFA;
//   background: -webkit-linear-gradient(to right, #0ED2F7, #B2FEFA);
//   background: linear-gradient(to right, #0ED2F7, #B2FEFA);
// }
// .theme4{
//   background: #30E8BF;
//   background: -webkit-linear-gradient(to right, #FF8235, #30E8BF);
//   background: linear-gradient(to right, #FF8235, #30E8BF);
// }
</style>
