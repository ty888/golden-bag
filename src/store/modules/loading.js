export default {
  namespaced: true,
  state: {
    loadings: {
      userList: false,
      user: false,
      departmentList: false,
      department: false,
      quarter: false,
      quarterList: false,
      templateList: false,
      template: false,
      // good: false,
      // goodList: false,
      // addGood: false,
      // modifyGood: false,
    },
  },
  mutations: {
    startLoading(state, { name }) {
      Object.assign(state.loadings, { [name]: true });
    },
    endLoading(state, { name }) {
      Object.assign(state.loadings, { [name]: false });
    },
  },
  actions: {
  },
};
