import Vue from 'vue';
import Router from 'vue-router';
import http from '@/utils/http';

Vue.use(Router);

let store = null;
export function installRouter(s) {
  store = s;
}

const router = new Router({
  routes: [
    {
      path: '/',
      icon: 'ion-md-cube',
      title: '工作台',
      name: 'workbench',
      component: () => import('@/views/Workbench.vue'),
    },
  ],
});

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
// export const appRoutes = [
//   {
//     path: '/',
//     icon: 'ion-md-cube',
//     // 作为顶级菜单
//     top: true,
//     component: Main,
//     children: [
//       {
//         path: '/',
//         title: '工作台',
//         name: 'Workbench',
//         component: () => import('@/views/Workbench.vue'),
//       },
//     ],
//   },
//   {
//     path: '/basics',
//     icon: 'ion-md-transgender',
//     name: 'basics',
//     title: '基础管理',
//     component: Main,
//     children: [
//       {
//         path: 'user',
//         title: '用户管理',
//         name: 'user.index',
//         component: () => import('@/views/user/Index.vue'),
//       },
//       {
//         path: 'role',
//         title: '角色管理',
//         name: 'role.index',
//         component: () => import('@/views/role/Index.vue'),
//       },
//       {
//         path: 'department',
//         title: '部门管理',
//         name: 'department.index',
//         component: () => import('@/views/department/Index.vue'),
//       },
//       {
//         path: 'quarter',
//         title: '季度管理',
//         name: 'quarter.index',
//         component: () => import('@/views/quarter/Index.vue'),
//       },
//     ],
//   },
//   {
//     path: '/template',
//     icon: 'ion-md-albums',
//     name: 'template',
//     title: '模版管理',
//     component: Main,
//     children: [
//       {
//         path: 'template',
//         title: '模板管理',
//         name: 'template.index',
//         component: () => import('@/views/template/Index.vue'),
//       },
//     ],
//   },
//   {
//     path: '/audit',
//     icon: 'ion-md-exit',
//     name: 'audit',
//     title: '审核管理',
//     component: Main,
//     children: [
//       {
//         path: 'direct_manager',
//         title: '直接经理评价',
//         name: 'direct_manager',
//         component: () => import('@/views/audit/DirectManager.vue'),
//       },
//       {
//         path: 'in_direct_manager',
//         title: '间接经理评价',
//         name: 'in_direct_manager',
//         component: () => import('@/views/audit/InDirectManager.vue'),
//       },
//     ],
//   },
// ];


// 路由映射
export const appRouterMapping = {
  'basic.user': [
    {
      path: '/user',
      title: '用户列表',
      name: 'user.index',
      component: () => import('@/views/user/Index.vue'),
    },
    {
      path: '/user/create',
      title: '新建用户',
      name: 'user.create',
      component: () => import('@/views/user/UserFrom.vue'),
    },
    {
      path: '/user/edit/:userId',
      title: '更新用户',
      name: 'user.edit',
      component: () => import('@/views/user/UserFrom.vue'),
    },
  ],
  'basic.role': [
    {
      path: '/role',
      title: '角色列表',
      name: 'role.index',
      component: () => import('@/views/role/Index.vue'),
    },
    {
      path: '/role/create',
      title: '新建角色',
      name: 'role.create',
      component: () => import('@/views/role/RoleFrom.vue'),
    },
    {
      path: '/role/edit/:roleId',
      title: '更新角色',
      name: 'role.edit',
      component: () => import('@/views/role/RoleFrom.vue'),
    },
  ],
  'basic.department': [
    {
      path: 'department',
      title: '部门管理',
      name: 'department.index',
      component: () => import('@/views/department/Index.vue'),
    },
  ],
  'basic.quarter': [
    {
      path: '/quarter',
      title: '季度管理',
      name: 'quarter.index',
      component: () => import('@/views/quarter/Index.vue'),
    },
  ],
  'template_module.template': [
    {
      path: '/template',
      title: '模版管理',
      name: 'template.index',
      component: () => import('@/views/template/Index.vue'),
    },
    {
      path: '/template/:templateId?',
      title: '编辑模板',
      name: 'template.show',
      component: () => import('@/views/template/Show.vue'),
    },
  ],
  'assessment.selfEvaluation': [
    {
      path: '/audit/self-evaluation',
      title: '自评',
      name: 'self_evaluation',
      component: () => import('@/views/audit/SelfEvaluation.vue'),
    },
  ],
  'assessment.directManagerScore': [
    {
      path: '/direct_manager',
      title: '直接经理评分',
      name: 'direct_manager',
      component: () => import('@/views/audit/DirectManager.vue'),
    },
    {
      path: '/audit/direct-evaluation/:recordId',
      title: '直接经理评价',
      name: 'direct_evaluation',
      component: () => import('@/views/audit/SelfEvaluation.vue'),
    },
  ],
  'assessment.indirectManagerAuditComments': [
    {
      path: '/in_direct_manager',
      title: '简介经理评分',
      name: 'in_direct_manager',
      component: () => import('@/views/audit/InDirectManager.vue'),
    },
    {
      path: '/audit/indirect-evaluation/:recordId',
      title: '间接经理评价',
      name: 'indirect_evaluation',
      component: () => import('@/views/audit/SelfEvaluation.vue'),
    },
  ],
  'assessment.summary': [
    {
      path: '/summary',
      title: '考核汇总',
      name: 'summary.index',
      component: () => import('@/views/summary/Index.vue'),
    },
  ],
};

http.get('permissions/menus', { loading: 'user' }).then((res) => {
  store.commit('updateMenuList', res.data.data);
  res.data.data.forEach((routerItem) => {
    routerItem.children.forEach((item) => {
      const mapKey = `${routerItem.name}.${item.name}`;
      if (!appRouterMapping[mapKey]) return;
      appRouterMapping[mapKey].forEach((route) => {
        router.addRoutes([{
          path: route.path,
          title: route.title,
          name: route.name,
          component: route.component,
        }]);
      });
    });
  });
});


export default router;
