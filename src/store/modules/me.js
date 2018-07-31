import http from '@/utils/http';

const app = {
  namespaced: true,
  state: {
    me: {},
  },
  mutations: {
    updateMe(state, data) {
      Object.assign(state, { me: data });
    },
  },
  actions: {
    async getMe({ commit }) { // eslint-disable-line
      const res = await http.get('me', {
        loading: 'me',
      });
      commit('updateMe', res.data.data);
    },
  },
};
export default app;
