<template>
  <div class="temp_main">
    <main-header title="模板管理">
      <div slot="right">
        <el-button @click="showPro = true" plain type="primary" icon="el-icon-plus">项目</el-button>
        <el-button
          @click="showOption = true"
          plain
          type="primary"
          icon="el-icon-plus">选项</el-button>
        <el-button
          @click="showSummary = true"
          plain
          type="success"
          icon="el-icon-plus">总结</el-button>
      </div>
    </main-header>
    <!-- 模板 -->
    <div class="right_page">
      <Template
        editTemplate
        :currentTemplate='currentTemplate'
      />
    </div>
    <!-- 添加选项 -->
    <el-dialog width="40%" title="添加选项" :visible.sync="showOption">
      <el-form
        :model="optionFrom"
        label-width="100px"
        label-position="left"
        class="form">
        <el-form-item label="选项标题">
          <el-input placeholder="请输入选项标题" v-model="optionFrom.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="选项分数">
          <el-input-number
            v-model="optionFrom.score"
            :min="1"
            :max="100"
          >
          </el-input-number>
        </el-form-item>
        <el-form-item label="选项所属">
          <el-select v-model="optionFrom.id" placeholder="请选择">
            <el-option
              v-for="item in currentTemplate.assessmentProjects"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitOption">提交</el-button>
        <el-button @click="showOption = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 添加总结 -->
    <el-dialog width="40%" title="添加总结" :visible.sync="showSummary">
      <el-form
        :model="summaryFrom"
        label-width="100px"
        label-position="left"
        class="form">
        <el-form-item label="总结标题">
          <el-input
            placeholder="请输入总结标题"
            v-model="summaryFrom.title"
            auto-complete="off">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitSummary">提交</el-button>
        <el-button @click="showSummary = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 添加项目 -->
    <el-dialog width="50%" title="添加项目" :visible.sync="showPro">
      <el-form
        :model="proFrom"
        label-width="80px"
        label-position="left"
        class="pro_form">
        <el-form-item label="项目标题">
          <el-input placeholder="输入项目标题" v-model="proFrom.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          label-position="right"
          v-for="(item, index) in proFrom.items"
          :label="`选项${index+1}`"
          :key="item.id"
        >
          <div class="option_list">
            <el-input class="title" v-model="item.title"></el-input>
            <el-input-number
              class="score"
              v-model="item.score"
              :min="1"
              :max="100"
            >
          </el-input-number>
            <el-button @click.prevent="removeOption(item)">删除</el-button>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitPro">提交</el-button>
        <el-button @click="addOptionPro">新增选项</el-button>
        <el-button @click="showPro = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import MainHeader from '@/components/MainHeader.vue';
import Template from '@/components/template/Template.vue';

const { mapActions, mapState } = createNamespacedHelpers('template');

export default {
  name: 'TemplateMain',
  components: {
    Template, MainHeader,
  },
  data() {
    return {
      options: [],
      showPro: false,
      showOption: false,
      showSummary: false,
      summaryFrom: {},
      optionFrom: {},
      proFrom: {
        title: '',
        items: [
          { title: '', score: '' },
          { title: '', score: '' },
          { title: '', score: '' },
          { title: '', score: '' },
        ],
      },
    };
  },
  methods: {
    ...mapActions([
      'getTemplate',
      'addTemplateProps',
    ]),
    submitPro() {
      this.proFrom.id = this.$route.params.templateId;
      this.addTemplateProps({ type: 'project', params: this.proFrom }).then(() => {
        this.showPro = false;
        this.$message.success('添加成功');
      });
    },
    submitOption() {
      this.addTemplateProps({ type: 'project_item', params: this.optionFrom }).then(() => {
        this.showOption = false;
        this.$message.success('添加成功');
      });
    },
    submitSummary() {
      this.summaryFrom.id = this.$route.params.templateId;
      this.addTemplateProps({ type: 'template_input', params: this.summaryFrom }).then(() => {
        this.showSummary = false;
        this.$message.success('添加成功');
      });
    },
    removeOption(item) {
      const index = this.proFrom.items.indexOf(item);
      if (index !== -1) {
        this.proFrom.items.splice(index, 1);
      }
    },
    addOptionPro() {
      this.proFrom.items.push({
        title: '',
        score: '',
      });
    },
  },
  computed: {
    ...mapState([
      'currentTemplate',
    ]),
  },
  created() {
    this.getTemplate(this.$route.params.templateId);
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

