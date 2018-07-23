export default {
  namespaced: true,
  state: {
    loadings: {
      SuppliersList: false,
      modifySuppliers: false,
      good: false,
      goodList: false,
      addGood: false,
      modifyGood: false,
      categories: false,
      categoriesList: false,
      modifyCategories: false,
      addCategories: false,
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
