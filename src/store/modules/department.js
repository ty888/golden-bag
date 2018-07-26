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
    addDepartment(state, newDepartment) {
      state.departmentList.unshift(newDepartment);
      state.DepartmentMeta.totalElements = state.DepartmentMeta.totalElements + 1; // eslint-disable-line
    },
    modifyDepartment(state, newDepartment) {
      const targetDepartmentIndex =
        state.departmentList.findIndex(item => item.id === newDepartment.id);
      Vue.set(state.departmentList, targetDepartmentIndex, newDepartment); // eslint-disable-line
    },
  },
  actions: {
    async getdepartmentList({ commit }, params) { // eslint-disable-line
      const newParams = { ...params };
      const defaultPageSettings = { page: 0, per_page: 10 };
      Object.keys(defaultPageSettings).forEach((key) => {
        if (!newParams[key]) {
          newParams[key] = defaultPageSettings[key];
        }
      });
      const res = await http.get('departments', {
        loading: 'departmentList',
        params: newParams,
      });
      commit('updateDepartmentList', res.data);
    },
    async getDepartment({ commit }, id) {
      const res = await http.get(`departments/${id}`, {
        loading: 'departmentList',
      });
      commit('updateDepartment', res.data);
    },
    async addDepartment({ commit }, Department) {
      const { data: { data: newDepartment } } = await http.post('departments', Department, { loading: 'departmentList' });
      commit('addDepartment', newDepartment);
    },
    async modifyDepartment({ commit }, Department) {
      const { data: { data: newDepartment } } = await http.put(`departments/${Department.id}`, Department, { loading: 'departmentList' });
      commit('modifyDepartment', newDepartment);
    },
  },
};
export default app;
