import Vue from 'vue';
import http from '@/utils/http';

const app = {
  namespaced: true,
  state: {
    userList: [],
    userMeta: {},
    currentUser: {},
    currentUserTemplate: {},
  },
  mutations: {
    updateUserList(state, { content, meta }) {
      Object.assign(state, { userList: content, userMeta: meta });
    },
    addUser(state, newUser) {
      state.userList.unshift(newUser);
      state.userMeta.totalElements = state.userMeta.totalElements + 1; // eslint-disable-line
    },
    updateUser(state, data) {
      Object.assign(state, { currentUser: data });
    },
    modifyUser(state, newUser) {
      const targetUserIndex =
        state.userList.findIndex(item => item.id === newUser.id);
      Vue.set(state.userList, targetUserIndex, newUser); // eslint-disable-line
    },
    deleteUser(state, id) {
      const targetUserIndex = state.userList.findIndex(item => item.id === id);
      state.userList.splice(targetUserIndex, 1); // eslint-disable-line
      state.userMeta.totalElements = state.userMeta.totalElements - 1; // eslint-disable-line
    },
    updateCurrentUserTemplate(state, { data }) {
      Object.assign(state, { currentUserTemplate: data });
    },
  },
  actions: {
    async getUserList({ commit }, params) { // eslint-disable-line
      const newParams = { ...params };
      const defaultPageSettings = { page: 0, per_page: 10 };
      Object.keys(defaultPageSettings).forEach((key) => {
        if (!newParams[key]) {
          newParams[key] = defaultPageSettings[key];
        }
      });
      const res = await http.get('users', {
        loading: 'userList',
        params: newParams,
      });
      res.data.data.meta = {
        number: res.data.data.number,
        size: res.data.data.size,
        totalElements: res.data.data.totalElements,
      };
      commit('updateUserList', res.data.data);
    },
    async getUser({ commit }, id) {
      const res = await http.get(`users/${id}`, {
        loading: 'userList',
      });
      commit('updateUser', res.data.data);
    },
    async addUser({ commit }, user) {
      const { data: { data: newUser } } = await http.post('users', user, { loading: 'user' });
      commit('addUser', newUser);
    },
    async modifyUser({ commit }, user) {
      const { data: { data: newUser } } = await http.put(`users/${user.id}`, user, { loading: 'user' });
      commit('modifyUser', newUser);
    },
    async deleteUser({ commit }, id) {
      await http.delete(`users/${id}`, { loading: 'userList' });
      commit('deleteUser', id);
    },
    async getCurrentUserTemplate({ commit }) {
      const res = await http.get('templates/get_template', { loading: 'user' });
      commit('updateCurrentUserTemplate', res.data);
    },
  },
};
export default app;
