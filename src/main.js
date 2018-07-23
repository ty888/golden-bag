import Vue from 'vue';
import 'normalize.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue';
import router from './router';
import store from './store';
import { installHttp } from './utils/http';

Vue.use(ElementUI);

installHttp(store);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    this.$store.commit('updateMenuList');
  },
  watch: {
    $route(to) {
      this.$store.dispatch('setCurrentPath', to.name);
    },
  },
}).$mount('#app');
