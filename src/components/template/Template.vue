<script>
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import InputTr from './InputTr.vue';

export default{
  name: 'Template',
  components: {
    InputTr,
  },
  render() {
    const proTrs = this.proLists.map((pro) => {
      const trs = pro.options.slice(1, pro.options.length).map((item, index) => {  // eslint-disable-line
        return (
          <tr>
            <td colspan="5">{item.title}</td>
            <td class="editable"><InputTr value={ item.value } on-input={ v => item.value = v }/></td>
          </tr>
        );
      });
      trs.unshift(<tr>
          <td rowspan={pro.options.length}>{pro.name}</td>
          <td colspan="5">{pro.options[0].title}</td>
          <td class="editable">
            <InputTr value={pro.options[0].value} on-input={v => pro.options[0].value = v} />
          </td>
          <td rowspan={pro.options.length} class="editable">
            <InputTr value={pro.self_evaluation} on-input={v => pro.self_evaluation = v} />
          </td>
          <td rowspan={pro.options.length} class="editable">
            <InputTr value={pro.direct_manager_score} on-input={v => pro.direct_manager_score = v}/>
          </td>
          <td rowspan={pro.options.length} class="editable">
            <InputTr type="textarea" value={pro.remarks} on-input={v => pro.remarks = v} />
          </td>
        </tr>);
      return trs;
    });
    const inputTrs = this.inputList.map((inputItem) => {
      const titleTds = [<tr><td colspan="10">{inputItem.title}</td></tr>];
      titleTds.push(<tr colspan="10">
          <td class="editable input_td" colspan="10">
            <InputTr type="textarea" value={inputItem.value} on-input={v => inputItem.value = v} />
          </td>
        </tr>);
      return titleTds;
    });
    return (
      <div class="template">
        <table class="table">
          <tr>
            <td colspan="10">上海容大数字技术有限公司</td>
          </tr>
          <tr>
            <td colspan="10">员工季度绩效考核表</td>
          </tr>
          <tr>
            <td colspan="10">注：本表适用于不带团队的员工填写</td>
          </tr>
          <tr>
            <td>姓名</td>
            <td class="editable">
              <InputTr value={ this.val } on-input={v => this.val = v} />
            </td>
            <td>部门</td>
            <td></td>
            <td>项目组</td>
            <td></td>
            <td>岗位</td>
            <td colspan="3"></td>
          </tr>
          <tr>
            <td>直接经理</td>
            <td></td>
            <td>间接经理</td>
            <td colspan="2"></td>
            <td>考核时间</td>
            <td></td>
            <td colspan="3">2018年第2季度</td>
          </tr>
          <tr>
            <td>考核项目</td>
            <td colspan="5">评分参考标准 </td>
            <td>分值</td>
            <td>自评得分</td>
            <td>直接经理评分</td>
            <td>备注</td>
          </tr>
          {proTrs}
          <tr>
            <td colspan="6">合记</td>
            <td class="editable">
              <InputTr value={this.val} on-input={v => this.val = v} />
            </td>
            <td class="editable">
              <InputTr value={this.val} on-input={v => this.val = v} />
            </td>
            <td class="editable">
              <InputTr value={this.val} on-input={v => this.val = v} />
            </td>
            <td class="editable">
              <InputTr value={this.val} on-input={v => this.val = v} />
            </td>
          </tr>
          <tr>
            <td colspan="10">工作总结、改进和工作目标计划</td>
          </tr>
          {inputTrs}
           <tr>
              <td colspan="4">间接经理审核意见</td>
              <td colspan="6" class="editable"><InputTr value={ this.val } on-input={v => this.val = v} /></td>
            </tr>
        </table>
      </div>
    );
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
    border: 1px solid rgb(219, 219, 219);
    border-collapse: collapse
  }
  .table{
    width: 100%;
  }
  .table td{
    min-width: 100px;
    background-color: #fff;
  }
  td.input_td{
    height: 120px;
  }
  .table td.editable{
    padding: 0!important;
  }
}
</style>

