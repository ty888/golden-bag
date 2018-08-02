import Vue from 'vue';
import http from '@/utils/http';
import { underline2Hump, initialUppercase } from '@/utils/utils';

const app = {
  namespaced: true,
  state: {
    staffTemplateList: [],
    managerTemplateList: [],
    currentTemplate: {
      assessmentInputs: [],
      assessmentProjects: [],
    },
  },
  mutations: {
    updateStaffTemplateList(state, { data }) {
      Object.assign(state, { staffTemplateList: data });
    },
    updateManagerTemplateList(state, { data }) {
      Object.assign(state, { managerTemplateList: data });
    },
    updateTemplate(state, data) {
      Object.assign(state, { currentTemplate: data });
    },
    modifyTemplate(state, newTemplate) {
      const targetTemplateIndex =
        state.templateList.findIndex(item => item.id === newTemplate.id);
      Vue.set(state.templateList, targetTemplateIndex, newTemplate); // eslint-disable-line
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
    updateTemplateInput(state, newTemplate) {
      const targetTemplateIndex =
        state.currentTemplate.assessmentInputs.findIndex(item => item.id === newTemplate.id);
      Vue.set(state.currentTemplate.assessmentInputs, targetTemplateIndex, newTemplate); // eslint-disable-line
    },
    // updateProject(state, newTemplate) {
    //   const targetTemplateIndex =
    //     state.currentTemplate.assessmentProjects.
    //     findIndex(item => item.title === newTemplate.titel);
    //   Vue.set(state.currentTemplate.assessmentProjects, targetTemplateIndex, newTemplate);
    // },
    // updateProjectItem(state, newTemplate) {
    //   const project =
    //     state.currentTemplate.assessmentProjects.find(item => item.id === newTemplate.parentId);
    //   if (project) {
    //     const targetTemplateIndex =
    //       state.project.items.findIndex(item => item.id === newTemplate.id);
    //     Vue.set(state.project.items, targetTemplateIndex, newTemplate); // eslint-disable-line
    //   }
    // },
  },
  actions: {
    async getStaffTemplateList({ commit }) { // eslint-disable-line
      const res = await http.get('templates?type=staff', {
        loading: 'templateList',
      });
      commit('updateStaffTemplateList', res.data);
    },
    async getManagerTemplateList({ commit }) { // eslint-disable-line
      const res = await http.get('templates?type=manager', {
        loading: 'templateList',
      });
      commit('updateManagerTemplateList', res.data);
    },
    async getTemplate({ commit }, id) {
      const res = await http.get(`templates/${id}`, {
        loading: 'template',
      });
      commit('updateTemplate', res.data.data);
    },
    async modifyTemplate({ commit }, { id, type, params }) {
      const { data: { data: newTemplateProps } } = await http.put(`/templates/${type}/${id}`, params);
      commit(`update${initialUppercase(underline2Hump(type))}`, newTemplateProps);
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
