import Vue from 'vue';
import Router from 'vue-router';

import { routes } from './routes';

Vue.use(Router);

const RouterConfig = {
  // mode: 'history',
  routes,
};
const router = new Router(RouterConfig);
export default router;
