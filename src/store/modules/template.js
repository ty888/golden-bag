import Vue from 'vue';
import http from '@/utils/http';
import { underline2Hump, initialUppercase } from '@/utils/utils';

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
    addProjectItem(state, projectItem) {
      const project =
        state.currentTemplate.assessmentProjects.find(item => item.id === projectItem.parentId);
      if (project) {
        project.items.push(projectItem);
      }
    },
    addProject(state, project) {
      state.currentTemplate.assessmentProjects.push(project);
    },
    addTemplateInput(state, input) {
      state.currentTemplate.assessmentInputs.push(input);
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
    async addTemplateProps({ commit }, { type, params }) {
      const { data: { data: newTemplateProps } } = await http.post(`templates/${params.id}/${type}`, params, { loading: 'templateList' });
      if (type === 'project_item') {
        newTemplateProps.parentId = params.id;
      }
      commit(`add${initialUppercase(underline2Hump(type))}`, newTemplateProps);
    },
  },
};
export default app;
