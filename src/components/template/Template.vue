<script>
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */

import { createNamespacedHelpers } from 'vuex';
import InputTr from './InputTr.vue';

const { mapActions, mapState } = createNamespacedHelpers('template');

export default{
  name: 'Template',
  components: {
    InputTr,
  },
  computed: {
    ...mapState([
      'currentTemplate',
    ]),
  },
  methods: {
    ...mapActions([
      'getTemplate',
      'modifyTemplate',
    ]),
    updateProject(id, title) {
      this.modifyTemplate({ id, type: 'project', params: { title } }).then(() => {
        this.$message.success('更新成功！');
      });
    },
    updateProjectItem(id, params) {
      this.modifyTemplate({ id, type: 'project_item', params }).then(() => {
        this.$message.success('更新成功！');
      });
    },
    updateInput(id, title) {
      this.modifyTemplate({ id, type: 'template_input', params: { title } }).then(() => {
        this.$message.success('更新成功！');
      });
    },
  },
  created() {
    this.getTemplate(this.$route.params.templateId);
  },
  render() {
    const proTrs = this.currentTemplate.assessmentProjects.map((pro) => {
      pro = pro || { items: [] };
      const trs = pro.items.slice(1, pro.items.length).map((item, index) => {  // eslint-disable-line
        return (
          <tr>
            {/* 除了第一列的 projet_item title score */}
            <td colspan="5"><InputTr disabled={!this.editTemplate} type="textarea"
              on-blur={(v) => {
                  if (v !== item.title) {
                    this.updateProjectItem(item.id, { title: v });
                  }
              }}
              value={item.title}
            /></td>
            <td><InputTr disabled={!this.editTemplate} value={ item.score }
              on-blur={(v) => {
                  if (v !== item.score) {
                    this.updateProjectItem(item.id, { score: v });
                  }
              }}
            /></td>
          </tr>
        );
      });
      trs.unshift(<tr>
          {/* title */}
          <td rowspan={pro.items.length}>
            <InputTr disabled={!this.editTemplate}
              on-blur={(v) => {
                  if (v !== pro.title) {
                    this.updateProject(pro.id, v);
                  }
              }}
              value={ pro.title }/>
          </td>
          {/* project 第一行title */}
          <td colspan="5">
            <InputTr disabled={!this.editTemplate} type="textarea"
              on-blur={(v) => {
                  if (v !== pro.items[0].title) {
                    this.updateProjectItem(pro.items[0].id, { title: v });
                  }
              }}
              value={ pro.items[0].title }/>
          </td>
          {/* project 第一行score */}
          <td>
            <InputTr disabled={!this.editTemplate}
              on-blur={(v) => {
                  if (v !== pro.items[0].score) {
                    this.updateProjectItem(pro.items[0].id, { score: v });
                  }
              }}
              value={pro.items[0].score} />
          </td>
          {/* 第一行自评得分 */}
          <td rowspan={pro.items.length}>
            <InputTr disabled={this.editTemplate}
              value={pro.self_evaluation} on-input={v => pro.self_evaluation = v} />
          </td>
          {/* 第一行直接经理评分 */}
          <td rowspan={pro.items.length}>
            <InputTr disabled={this.editTemplate}
              value={pro.direct_manager_score} on-input={v => pro.direct_manager_score = v}/>
          </td>
          {/* 第一行备注 */}
          <td rowspan={pro.items.length}>
            <InputTr disabled={this.editTemplate}
              type="textarea" value={pro.remarks} on-input={v => pro.remarks = v} />
          </td>
        </tr>);
      return trs;
    });
    const inputTrs = this.currentTemplate.assessmentInputs.map((inputItem) => {
      const titleTds = [<tr class="editable">
          {/* 总结title */}
          <td colspan="10"><InputTr disabled={!this.editTemplate} value={inputItem.title}
            on-blur={(v) => {
                  if (v !== inputItem.title) {
                    this.updateInput(inputItem.id, v);
                  }
              }}
          />
          </td>
        </tr>];
      titleTds.push(<tr class="editable" colspan="10">
          <td class="input_td" colspan="10">
            {/* 总结content */}
            <InputTr disabled={this.editTemplate} type="textarea" value={inputItem.value} on-input={v => inputItem.value = v} />
          </td>
        </tr>);
      return titleTds;
    });
    return (
      <div class="template">
        <table cellpadding="0" class="table">
          <tr>
            <td colspan="10"><InputTr disabled value="上海容大数字技术有限公司" /></td>
          </tr>
          <tr>
            <td colspan="10"><InputTr disabled value="员工季度绩效考核表" /></td>
          </tr>
          <tr>
            <td colspan="10"><InputTr disabled value="注：本表适用于不带团队的员工填写" /></td>
          </tr>
          <tr>
            <td><InputTr disabled value="姓名" /></td>
            <td>
              <InputTr value={ this.val } on-input={v => this.val = v} />
            </td>
            <td><InputTr disabled value="部门" /></td>
            <td></td>
            <td><InputTr disabled value="项目组" /></td>
            <td></td>
            <td><InputTr disabled value="岗位" /></td>
            <td colspan="3"></td>
          </tr>
          <tr>
            <td><InputTr disabled value="直接经理" /></td>
            <td></td>
            <td><InputTr disabled value="间接经理" /></td>
            <td colspan="2"></td>
            <td><InputTr disabled value="考核时间" /></td>
            <td></td>
            <td colspan="3"><InputTr disabled value="2018年第2季度" /></td>
          </tr>
          <tr>
            <td><InputTr disabled value="考核项目" /></td>
            <td colspan="5"><InputTr disabled value="评分参考标准" /></td>
            <td><InputTr disabled value="分值" /></td>
            <td><InputTr disabled value="自评得分" /></td>
            <td><InputTr disabled value="直接经理评分" /></td>
            <td><InputTr disabled value="备注" /></td>
          </tr>
          {proTrs}
          <tr>
            <td colspan="6">合记</td>
            <td>
              <InputTr value={this.val} on-input={v => this.val = v} />
            </td>
            <td>
              <InputTr value={this.val} on-input={v => this.val = v} />
            </td>
            <td>
              <InputTr value={this.val} on-input={v => this.val = v} />
            </td>
            <td>
              <InputTr value={this.val} on-input={v => this.val = v} />
            </td>
          </tr>
          <tr>
            <td colspan="10"><InputTr disabled value="工作总结、改进和工作目标计划" /></td>
          </tr>
          {inputTrs}
           <tr>
              <td colspan="4"><InputTr disabled value="间接经理审核意见" /></td>
              <td colspan="6"><InputTr value={ this.val } on-input={v => this.val = v} /></td>
            </tr>
        </table>
      </div>
    );
  },
  props: {
    editTemplate: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  data() {
    return {
      vale: 'ty',
      proLists: [
        {
          name: '(1)基础操守',
          options: [
            { title: 'A. 非常自觉遵守公司及驻场的各项规章制度，以身作则，起模范带头作用', value: '10' },
            { title: 'A. 非常自觉遵守公司及驻场的各项规章制度，以身作则，起模范带头作用', value: '10' },
            { title: 'A. 非常自觉遵守公司及驻场的各项规章制度，以身作则，起模范带头作用', value: '10' },
            { title: 'A. 非常自觉遵守公司及驻场的各项规章制度，以身作则，起模范带头作用', value: '10' },
            { title: 'A. 非常自觉遵守公司及驻场的各项规章制度，以身作则，起模范带头作用', value: '10' },
          ],
          self_evaluation: '10',
          direct_manager_score: '10',
          remarks: '垃圾',
        },
        {
          name: '(1)基础操守',
          options: [
            { title: 'A. 非常自觉遵守公司及驻场的各项规章制度，以身作则，起模范带头作用', value: '10' },
            { title: 'A. 非常自觉遵守公司及驻场的各项规章制度，以身作则，起模范带头作用', value: '10' },
            { title: 'A. 非常自觉遵守公司及驻场的各项规章制度，以身作则，起模范带头作用', value: '10' },
            { title: 'A. 非常自觉遵守公司及驻场的各项规章制度，以身作则，起模范带头作用', value: '10' },
            { title: 'A. 非常自觉遵守公司及驻场的各项规章制度，以身作则，起模范带头作用', value: '10' },
          ],
          self_evaluation: '10',
          direct_manager_score: '10',
          remarks: '垃圾',
        },
        {
          name: '(1)基础操守',
          options: [
            { title: 'A. 非常自觉遵守公司及驻场的各项规章制度，以身作则，起模范带头作用', value: '10' },
            { title: 'A. 非常自觉遵守公司及驻场的各项规章制度，以身作则，起模范带头作用', value: '10' },
            { title: 'A. 非常自觉遵守公司及驻场的各项规章制度，以身作则，起模范带头作用', value: '10' },
            { title: 'A. 非常自觉遵守公司及驻场的各项规章制度，以身作则，起模范带头作用', value: '10' },
            { title: 'A. 非常自觉遵守公司及驻场的各项规章制度，以身作则，起模范带头作用', value: '10' },
          ],
          self_evaluation: '10',
          direct_manager_score: '10',
          remarks: '垃圾',
        },
      ],
      inputList: [
        { title: '1．工作总结（包括主要工作内容，计划完成情况、主要成果，个人取得的进步等;', value: '' },
        { title: '2．你觉得自身工作中还存在哪些问题及改进计划？对公司的工作有何意见和建议', value: '' },
        { title: '3．你下一个阶段的工作目标和计划', value: '' },
        { title: '4．直接经理评价和改进建议', value: '' },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.template{
  padding: 60px;
  background-color: #fff;
  .table,
  .table th,
  .table td {
    text-align: center;
    padding: 8px 3px;
    // border: 1px solid rgb(219, 219, 219);
    border: 1px solid #888;
    border-collapse: collapse
  }
  .table{
    width: 100%;
  }
  .table td{
    padding: 0;
    min-width: 100px;
    background-color: #fff;
  }
  td.input_td{
    height: 120px;
  }
}
</style>

