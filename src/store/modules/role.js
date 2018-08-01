import Vue from 'vue';
import http from '@/utils/http';

const app = {
  namespaced: true,
  state: {
    roleList: [],
    roleMeta: {},
    currentRole: {},
    // 权限
    permissionList: {},
    permissionMeta: {},
  },
  mutations: {
    updateRoleList(state, { content, meta }) {
      Object.assign(state, { roleList: content, roleMeta: meta });
    },
    addRole(state, newRole) {
      state.roleList.unshift(newRole);
      state.roleMeta.totalElements = state.roleMeta.totalElements + 1; // eslint-disable-line
    },
    updateRole(state, { data, meta }) {
      Object.assign(state, { currentRole: data, permissionMeta: meta });
    },
    modifyRole(state, newRole) {
      const targetRoleIndex =
        state.roleList.findIndex(item => item.id === newRole.id);
      Vue.set(state.roleList, targetRoleIndex, newRole); // eslint-disable-line
    },
    deleteRole(state, id) {
      const targetRoleIndex = state.roleList.findIndex(item => item.id === id);
      state.roleList.splice(targetRoleIndex, 1); // eslint-disable-line
      state.roleMeta.totalElements = state.roleMeta.totalElements - 1; // eslint-disable-line
    },
    // 权限
    updatePermissionList(state, { data }) {
      Object.assign(state, { permissionList: data });
    },
  },
  actions: {
    async getRoleList({ commit }, params) { // eslint-disable-line
      const newParams = { ...params };
      const defaultPageSettings = { page: 0, per_page: 10 };
      Object.keys(defaultPageSettings).forEach((key) => {
        if (!newParams[key]) {
          newParams[key] = defaultPageSettings[key];
        }
      });
      const res = await http.get('roles', {
        loading: 'roleList',
        params: newParams,
      });
      res.data.data.meta = {
        number: res.data.data.number,
        size: res.data.data.size,
        totalElements: res.data.data.totalElements,
      };
      commit('updateRoleList', res.data.data);
    },
    async getRole({ commit }, id) {
      const res = await http.get(`roles/${id}`, {
        loading: 'roleList',
      });
      commit('updateRole', res.data);
    },
    async addRole({ commit }, role) {
      const { data: { data: newRole } } = await http.post('roles', role, { loading: 'role' });
      commit('addRole', newRole);
    },
    async modifyRole({ commit }, role) {
      const { data: { data: newRole } } = await http.put(`roles/${role.id}`, role, { loading: 'role' });
      commit('modifyRole', newRole);
    },
    async deleteRole({ commit }, id) {
      await http.delete(`roles/${id}`, { loading: 'roleList' });
      commit('deleteRole', id);
    },
    // 权限
    async getRermissionList({ commit }) {
      const res = await http.get('permissions', { loading: 'permissionList' });
      commit('updatePermissionList', res.data);
    },
  },
};
export default app;
