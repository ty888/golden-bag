import http from '@/utils/http';

const app = {
  namespaced: true,
  state: {
    summaryList: [],
    summaryMeta: {},
  },
  mutations: {
    updateSummaryList(state, { content, meta }) {
      Object.assign(state, { summaryList: content, summaryMeta: meta });
    },
  },
  actions: {
    async getSummaryList({ commit }, params) { // eslint-disable-line
      const newParams = { ...params };
      const defaultPageSettings = { page: 0, per_page: 10 };
      Object.keys(defaultPageSettings).forEach((key) => {
        if (!newParams[key]) {
          newParams[key] = defaultPageSettings[key];
        }
      });
      const res = await http.get('assessments', {
        loading: 'summaryList',
        params: newParams,
      });
      console.log(res);
      res.data.data.meta = {
        number: res.data.data.number,
        size: res.data.data.size,
        totalElements: res.data.data.totalElements,
      };
      commit('updateSummaryList', res.data.data);
    },

    // 导出指定一条记录
    async exportRecord(_, id) {
      // console.log(id);
      window.location = `assessments/export/${id}`;
      // await http.get(`assessments/export/${id}`, {
      //   loading: 'export',
      // });
    },
    // 按季度导出记录
    async exportQuarterRecord(_, ids = [1]) {
      await http.get(`assessments/batch_export/byquarters?quarer_ids=${ids.join(',')}`, {
        loading: 'export',
      });
    },
    // 导出指定多条记录
    async exportRecords(_, ids) {
      await http.get(`assessments/batch_export/byquarters?quarer_ids=${ids}`, {
        loading: 'export',
      });
    },
  },
};
export default app;
