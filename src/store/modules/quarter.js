import Vue from 'vue';
import http from '@/utils/http';

const app = {
  namespaced: true,
  state: {
    quarterList: [],
    quarterMeta: {},
    currentQuarter: {},
  },
  mutations: {
    updateQuarterList(state, { content, meta }) {
      Object.assign(state, { quarterList: content, quarterMeta: meta });
    },
    addQuarter(state) {
      state.quarterMeta.totalElements = state.quarterMeta.totalElements + 1; // eslint-disable-line
    },
    updateQuarter(state, data) {
      Object.assign(state, { currentQuarter: data });
    },
    modifyQuarter(state, newQuarter) {
      const targetQuarterIndex =
        state.quarterList.findIndex(item => item.id === newQuarter.id);
      Vue.set(state.quarterList, targetQuarterIndex, newQuarter); // eslint-disable-line
    },
    deleteQuarter(state, id) {
      const targetQuarterIndex = state.quarterList.findIndex(item => item.id === id);
      state.quarterList.splice(targetQuarterIndex, 1); // eslint-disable-line
      state.quarterMeta.totalElements = state.quarterMeta.totalElements - 1; // eslint-disable-line
    },
  },
  actions: {
    async getQuarterList({ commit }, params) { // eslint-disable-line
      const newParams = { ...params };
      const defaultPageSettings = { page: 0, per_page: 10 };
      Object.keys(defaultPageSettings).forEach((key) => {
        if (!newParams[key]) {
          newParams[key] = defaultPageSettings[key];
        }
      });
      const res = await http.get('quarters', {
        loading: 'quarterList',
        params: newParams,
      });
      res.data.data.meta = {
        number: res.data.data.number,
        size: res.data.data.size,
        totalElements: res.data.data.totalElements,
      };
      commit('updateQuarterList', res.data.data);
    },
    async getQuarter({ commit }, id) {
      const res = await http.get(`quarters/${id}`, {
        loading: 'quarter',
      });
      commit('updateQuarter', res.data.data);
    },
    async addQuarter({ commit }, quarter) {
      await http.post('quarters', quarter, { loading: 'quarter' });
      commit('addQuarter');
    },
    async modifyQuarter({ commit }, quarter) {
      const { data: { data: newQuarter } } = await http.put(`quarters/${quarter.id}`, quarter, { loading: 'quarter' });
      commit('modifyQuarter', newQuarter);
    },
    async deleteQuarter({ commit }, id) {
      await http.delete(`quarters/${id}`, { loading: 'quarterList' });
      commit('deleteQuarter', id);
    },
  },
};
export default app;
