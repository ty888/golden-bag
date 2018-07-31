import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import loading from './modules/loading';
import user from './modules/user';
import department from './modules/department';
import quarter from './modules/quarter';
import template from './modules/template';
import audit from './modules/audit';
import me from './modules/me';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    app,
    loading,
    user,
    department,
    quarter,
    template,
    audit,
    me,
  },
});
