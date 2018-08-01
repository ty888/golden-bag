export default {
  namespaced: true,
  state: {
    loadings: {
      me: false,
      userList: false,
      user: false,
      role: false,
      roleList: false,
      departmentList: false,
      department: false,
      quarter: false,
      quarterList: false,
      templateList: false,
      template: false,
      audit: false,
      auditList: false,
      permissionList: false,
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
