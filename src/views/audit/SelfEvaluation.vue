<template>
  <div class="self_evaluation">
    <main-header title="自评">
      <div slot="right">
        <el-button
          @click="submitSelf"
          plain type="primary"
          icon="el-icon-plus"
          v-if="this.$route.name === 'self_evaluation'"
        >
          提交评价
        </el-button>
        <el-button
          @click="submitDirect"
          plain type="primary"
          icon="el-icon-plus"
          v-if="this.$route.name === 'direct_evaluation'"
        >
          提交评价
        </el-button>
        <el-button
          @click="submitIndirect"
          plain type="primary"
          icon="el-icon-plus"
          v-if="this.$route.name === 'indirect_evaluation'"
        >
          提交评价
        </el-button>
      </div>
    </main-header>
    <!-- 模板 -->
    <div class="right_page">
      <Template
        @editSelfProject="editSelfProject"
        @editSelfInput="editSelfInput"
        @editDirectProject='editDirectProject'
        @editDirectInput='editDirectInput'
        @editInDirectInput='editInDirectInput'
        :editTemplate='false'
        :selfInfo='this.selfInfo'
        :basicsInfo='me'
        :currentTemplate='currentUserTemplate'
      />
    </div>
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader.vue';
import Template from '@/components/template/Template.vue';

export default {
  // 自评页面
  name: 'SelfEvaluation',
  components: {
    Template, MainHeader,
  },
  data() {
    return {
      selfEvaluationData: {
        assessmentProjectScores: [],
        assessmentInputContents: [],
      },
      directEvaluationData: {
        assessmentProjectScores: [],
      },
      inDirectEvaluationData: {},
    };
  },
  methods: {
    getTemplate(templateId) {
      this.$store.dispatch('template/getTemplate', templateId);
    },
    editSelfProject(id, value) {
      const projectObj = {
        assessmentProject: { id },
        selfScore: value,
      };
      const index =
      this.selfEvaluationData.assessmentProjectScores
        .findIndex(item => item.assessmentProject.id === id);
      if (index >= 0) {
        this.selfEvaluationData.assessmentProjectScores[index] = projectObj;
      } else {
        this.selfEvaluationData.assessmentProjectScores.push(projectObj);
      }
    },
    editSelfInput(id, v) {
      const inputObj = {
        assessmentInput: { id },
        content: v,
      };
      const index =
      this.selfEvaluationData.assessmentInputContents
        .findIndex(item => item.assessmentInput.id === id);
      if (index >= 0) {
        this.selfEvaluationData.assessmentInputContents[index] = inputObj;
      } else {
        this.selfEvaluationData.assessmentInputContents.push(inputObj);
      }
    },
    // 直接经理评价
    editDirectProject(id, v) {
      const inputObj = {
        assessmentProject: { id },
        managerScores: v,
      };
      const index =
      this.directEvaluationData.assessmentProjectScores
        .findIndex(item => item.assessmentProject.id === id);
      if (index >= 0) {
        this.directEvaluationData.assessmentProjectScores[index] = inputObj;
      } else {
        this.directEvaluationData.assessmentProjectScores.push(inputObj);
      }
    },
    editDirectInput(v) {
      this.directEvaluationData.directManagerEvaluation = v;
    },
    // 间接经理评价
    editInDirectInput(v) {
      this.inDirectEvaluationData.indirectManagerAuditComments = v;
    },
    submitSelf() {
      this.$store.dispatch('audit/selfEvaluation', this.selfEvaluationData).then(() => {
        this.$message.success('评价成功！');
        this.$router.push({ name: 'workbench' });
      });
    },
    submitDirect() {
      // this.directEvaluationData.id = this.$route.params.recordId;
      // this.$store.dispatch('audit/directEvaluation', this.directEvaluationData).then(() => {
      //   this.$message.success('评价成功！');
      //   this.$router.push({ name: 'direct_manager' });
      // });
      console.log(this.selfInfo);
    },
    submitIndirect() {
      this.inDirectEvaluationData.id = this.$route.params.recordId;
      this.$store.dispatch('audit/inDirectEvaluation', this.inDirectEvaluationData).then(() => {
        this.$message.success('评价成功！');
        this.$router.push({ name: 'in_direct_manager' });
      });
    },
  },
  computed: {
    me() {
      return this.$store.state.me.me;
    },
    currentUserTemplate() {
      return this.$store.state.user.currentUserTemplate;
    },
    selfInfo() {
      return this.$store.state.audit.selfInfo;
    },
    // title() {
    //   if (this.$route.name === 'self_evaluation'){}
    // },
  },
  created() {
    if (this.$route.name !== 'self_evaluation') {
      this.$store.dispatch('audit/getSelfInfo', this.$route.params.recordId);
    }
  },
};
</script>

<style lang="less" scoped>
.form{
  width: 400px;
  margin: 0 auto;
}
.pro_form{
  width: 80%;
  margin: 0 auto;
}
.option_list{
  .title{
    width: 50%;
    float: left;
  }
  .score{
    width: 28%;
    float: left;
    margin: 0 10px;
  }
}
</style>

