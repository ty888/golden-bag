import Main from '@/views/Main.vue';

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRoute里
export const otherRoute = {
  path: '/',
  name: 'otherRoute',
  component: Main,
  children: [
    {
      path: 'test',
      title: '这是一个test',
      name: 'test_index',
      component: {
        render(h) {
          return h('h2', null, '这个页面不在菜单显示');
        },
      },
    },
    {
      path: 'template/:templateId?',
      title: '编辑模板',
      name: 'template.show',
      component: () => import('@/views/template/Show.vue'),
    },
    {
      path: 'template/create',
      title: '新建模板',
      name: 'template.create',
      component: () => import('@/views/template/Show.vue'),
    },
    {
      path: 'user/create',
      title: '新建用户',
      name: 'user.create',
      component: () => import('@/views/user/UserFrom.vue'),
    },
    {
      path: 'user/edit/:userId',
      title: '更新用户',
      name: 'user.edit',
      component: () => import('@/views/user/UserFrom.vue'),
    },
    {
      path: 'audit/self-evaluation',
      title: '自评',
      name: 'self_evaluation',
      component: () => import('@/views/audit/SelfEvaluation.vue'),
    },
    {
      path: 'audit/direct-evaluation/:recordId',
      title: '直接经理评价',
      name: 'direct_evaluation',
      component: () => import('@/views/audit/SelfEvaluation.vue'),
    },
    {
      path: 'audit/indirect-evaluation/:recordId',
      title: '间接经理评价',
      name: 'indirect_evaluation',
      component: () => import('@/views/audit/SelfEvaluation.vue'),
    },
  ],
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRoutes = [
  {
    path: '/',
    icon: 'ion-md-cube',
    // 作为顶级菜单
    top: true,
    component: Main,
    children: [
      {
        path: '/',
        title: '工作台',
        name: 'Workbench',
        component: () => import('@/views/Workbench.vue'),
      },
    ],
  },
  {
    path: '/basics',
    icon: 'ion-md-analytics',
    name: 'basics',
    title: '基础管理',
    component: Main,
    children: [
      {
        path: 'user',
        title: '用户管理',
        name: 'user.index',
        component: () => import('@/views/user/Index.vue'),
      },
      {
        path: 'department',
        title: '部门管理',
        name: 'department.index',
        component: () => import('@/views/department/Index.vue'),
      },
      {
        path: 'quarter',
        title: '季度管理',
        name: 'quarter.index',
        component: () => import('@/views/quarter/Index.vue'),
      },
      {
        path: 'template',
        title: '模板管理',
        name: 'template.index',
        component: () => import('@/views/template/Index.vue'),
      },
    ],
  },
  {
    path: '/audit',
    icon: 'ion-md-analytics',
    name: 'audit',
    title: '审核管理',
    component: Main,
    children: [
      {
        path: 'direct_manager',
        title: '直接经理评价',
        name: 'direct_manager',
        component: () => import('@/views/audit/DirectManager.vue'),
      },
      {
        path: 'in_direct_manager',
        title: '间接经理评价',
        name: 'in_direct_manager',
        component: () => import('@/views/audit/InDirectManager.vue'),
      },
    ],
  },
];

export const routes = [
  ...appRoutes,
  otherRoute,
];
