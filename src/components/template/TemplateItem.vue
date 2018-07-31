<template>
  <div class="template_item">
    <div class="box">
      <div class="pic">
        <div class="mask">
          <el-button
            @click="edit"
            class="edit_btn"
            type="primary"
            icon="el-icon-edit"
            circle>
          </el-button>
        </div>
      </div>
      <div class="disc">
        <h3 class="title">{{title}}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TemplateItem',
  props: {
    title: String,
    id: [Number, String],
  },
  methods: {
    edit() {
      this.$router.push({ name: 'template.show', params: { templateId: this.id } });
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
    &:hover .mask{
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
    position: relative;
    >.mask{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .6);
      opacity: 0;
      transition: opacity .2s;
      .edit_btn{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
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
