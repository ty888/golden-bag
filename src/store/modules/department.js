import Vue from 'vue';
import http from '@/utils/http';

const app = {
  namespaced: true,
  state: {
    departmentList: [],
    currentDepartment: {},
  },
  mutations: {
    updateDepartmentList(state, { data }) {
      Object.assign(state, { departmentList: data });
    },
    addDepartment(state, newDepartment) { // eslint-disable-line
      // state.departmentList.unshift(newDepartment);
    },
    updateDepartment(state, data) {
      Object.assign(state, { currentDepartment: data });
    },
    modifyDepartment(state, newDepartment) {
      const targetDepartmentIndex =
        state.departmentList.findIndex(item => item.id === newDepartment.id);
      Vue.set(state.departmentList, targetDepartmentIndex, newDepartment); // eslint-disable-line
    },
    deleteDepartment(state, id) {
      const targetDepartmentIndex = state.departmentList.findIndex(item => item.id === id);
      state.departmentList.splice(targetDepartmentIndex, 1); // eslint-disable-line
    },
  },
  actions: {
    async getDepartmentList({ commit }, params) { // eslint-disable-line
      const res = await http.get('departments', {
        loading: 'departmentList',
        params,
      });
      commit('updateDepartmentList', res.data);
    },
    async getDepartment({ commit }, id) {
      const res = await http.get(`departments/${id}`, {
        loading: 'department',
      });
      commit('updateDepartment', res.data.data);
    },
    async addDepartment({ commit }, Department) {
      const { data: { data: newDepartment } } = await http.post('departments', Department, { loading: 'department' });
      commit('addDepartment', newDepartment);
    },
    async modifyDepartment({ commit }, Department) {
      const { data: { data: newDepartment } } = await http.put(`departments/${Department.id}`, Department, { loading: 'department' });
      commit('modifyDepartment', newDepartment);
    },
    async deleteDepartment({ commit }, id) {
      await http.delete(`departments/${id}`, { loading: 'department' });
      commit('deleteDepartment', id);
    },
  },
};
export default app;
