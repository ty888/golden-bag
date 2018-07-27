import Vue from 'vue';
import http from '@/utils/http';

const app = {
  namespaced: true,
  state: {
    templateList: [],
    currentTemplate: {
      assessmentInputs: [],
      assessmentProjects: [],
    },
  },
  mutations: {
    updateTemplateList(state, { content }) {
      Object.assign(state, { templateList: content });
    },
    addTemplate(state, newTemplate) { // eslint-disable-line
      // state.templateList.unshift(newTemplate);
    },
    updateTemplate(state, data) {
      Object.assign(state, { currentTemplate: data });
    },
    modifyTemplate(state, newTemplate) {
      const targetTemplateIndex =
        state.templateList.findIndex(item => item.id === newTemplate.id);
      Vue.set(state.templateList, targetTemplateIndex, newTemplate); // eslint-disable-line
    },
    deleteTemplate(state, id) {
      const targetTemplateIndex = state.templateList.findIndex(item => item.id === id);
      state.templateList.splice(targetTemplateIndex, 1); // eslint-disable-line
    },
  },
  actions: {
    async getTemplateList({ commit }, params) { // eslint-disable-line
      const res = await http.get('templates', {
        loading: 'templateList',
        params,
      });
      commit('updateTemplateList', res.data.data);
    },
    async getTemplate({ commit }, id) {
      const res = await http.get(`templates/${id}`, {
        loading: 'template',
      });
      commit('updateTemplate', res.data.data);
    },
    async addTemplate({ commit }, template) {
      const { data: { data: newTemplate } } = await http.post('templates', template, { loading: 'templateList' });
      commit('addTemplate', newTemplate);
    },
    async modifyTemplate({ commit }, { id, type, params }) {
      await http.put(`/templates/${type}/${id}`, params);
      console.log(commit);
    },
    async deleteTemplate({ commit }, id) {
      await http.delete(`templates/${id}`, { loading: 'templateList' });
      commit('deleteTemplate', id);
    },
  },
};
export default app;
