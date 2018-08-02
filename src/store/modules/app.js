// import { appRoutes} from '@/router/routes';
// import { otherRoute } from '@/router';
import { handleTitle } from '@/utils/utils';

const app = {
  state: {
    // 菜单列表
    menuList: [],
    // 面包屑
    currentPath: [],
    // 所有main组件的子路由
    childrenRoutes: [
      // otherRoute,
    ],
    // 侧边菜单栏是否展开
    isCollapse: false,
  },
  mutations: {
    updateMenuList(state, data) {
      // todo 权限处理
      Object.assign(state, { menuList: data });
    },
    updateCurrentPath(state, path) {
      Object.assign(state, { currentPath: path });
    },
    toggleCollapse(state) {
      Object.assign(state, { isCollapse: !state.isCollapse });
    },
    updateChildrenRoutes(state, routes) {
      Object.assign(state, { childrenRoutes: routes });
    },
  },
  actions: {
    setCurrentPath({ commit, state }, routeName) {
      // 递归搜索路由找到name
      function searchRoutes(name, routes, parentRoute, path) {
        let isFindTree = false;
        routes.forEach((item) => {
          if (item.name === name) {
            path.unshift(item);
            isFindTree = true;
            return;
          }
          if (item.children) {
            // 有子路由
            isFindTree = searchRoutes(name, item.children, item, path);
          }
        });
        if (isFindTree && parentRoute && !parentRoute.top) {
          path.unshift(parentRoute);
        }
        return isFindTree;
      }
      let path = [];
      searchRoutes(routeName, state.childrenRoutes, null, path);
      path = path.filter(item => !!item.title);
      // 面包屑不显示isMain的链接
      path = path.map(item => Object.assign(item, { isMain: item.component.name === 'Main' }));
      path.unshift({
        title: '首页',
        name: 'dashboard',
      });
      commit('updateCurrentPath', path);
      handleTitle(path);
    },
  },
};
export default app;
