import http from '@/utils/http';

const app = {
  namespaced: true,
  state: {
    me: {},
    isSubmit: false,
    permissionsMenus: [],
  },
  mutations: {
    updateMe(state, { data, meta }) {
      Object.assign(state, { me: data, isSubmit: meta.is_submited });
    },
    updatePermissionsMenus(state, { data }) {
      Object.assign(state, { permissionsMenus: data });
    },
  },
  actions: {
    async getMe({ commit }) { // eslint-disable-line
      const res = await http.get('me', {
        loading: 'me',
      });
      commit('updateMe', res.data);
    },
    async getMenu({ commit }) {
      const res = await http.get('permissions/menus');
      commit('updatePermissionsMenus', res.data);
    },
  },
};
export default app;
