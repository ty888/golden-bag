// import Vue from 'vue';
import http from '@/utils/http';

const app = {
  namespaced: true,
  state: {
    directManagerList: [],
    directManagerMeta: {},
    inDirectManagerList: [],
    inDirectManagerMeta: {},
  },
  mutations: {
    updateDirectManagerList(state, { content, meta }) {
      Object.assign(state, { directManagerList: content, directManagerMeta: meta });
    },
    updateDirectManager(state, data) {
      Object.assign(state, { currentDirectManager: data });
    },
    updateInDirectManagerList(state, { content, meta }) {
      Object.assign(state, { inDirectManagerList: content, InDirectManagerMeta: meta });
    },
    updateInDirectManager(state, data) {
      Object.assign(state, { currentInDirectManager: data });
    },
  },
  actions: {
    async getDirectManagerList({ commit }, params) { // eslint-disable-line
      const newParams = { ...params };
      const defaultPageSettings = { page: 0, per_page: 10 };
      Object.keys(defaultPageSettings).forEach((key) => {
        if (!newParams[key]) {
          newParams[key] = defaultPageSettings[key];
        }
      });
      const res = await http.get('me/review_list', {
        loading: 'auditList',
        params: newParams,
      });
      res.data.data.meta = {
        number: res.data.data.number,
        size: res.data.data.size,
        totalElements: res.data.data.totalElements,
      };
      commit('updateDirectManagerList', res.data.data);
    },
    async getInDirectManagerList({ commit }, params) { // eslint-disable-line
      const newParams = { ...params };
      const defaultPageSettings = { page: 0, per_page: 10 };
      Object.keys(defaultPageSettings).forEach((key) => {
        if (!newParams[key]) {
          newParams[key] = defaultPageSettings[key];
        }
      });
      const res = await http.get('me/comment_list', {
        loading: 'auditList',
        params: newParams,
      });
      res.data.data.meta = {
        number: res.data.data.number,
        size: res.data.data.size,
        totalElements: res.data.data.totalElements,
      };
      commit('updateInDirectManagerList', res.data.data);
    },
    async selfEvaluation(_, params) {
      await http.post('self_evaluation', params, {
        loading: 'audit',
      });
    },
    async directEvaluation(_, params) {
      await http.put(`direct_manager_score/${params.id}`, params, {
        loading: 'audit',
      });
    },
    async inDirectEvaluation(_, params) {
      console.log(params);
      await http.put(`indirect_manager_comments/${params.id}`, params, {
        loading: 'audit',
      });
    },
  },
};
export default app;
