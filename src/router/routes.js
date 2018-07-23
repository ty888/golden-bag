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
    // {
    //   path: 'add_good',
    //   title: '新建商品',
    //   name: 'add_good',
    //   component: () => import('@/views/goods/GoodForm'),
    // },
  ],
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRoutes = [
  {
    path: '/',
    icon: 'el-icon-menu',
    // 作为顶级菜单
    top: true,
    component: Main,
    children: [
      {
        path: 'dashboard',
        title: '工作台',
        name: 'dashboard',
        component: () => import('@/views/dashboard/Dashboard.vue'),
      },
    ],
  },
  {
    path: '/goods',
    icon: 'el-icon-goods',
    name: 'goods',
    top: true,
    title: '商品中心',
    component: Main,
    children: [
      {
        path: 'text',
        title: '商品列表',
        name: 'text',
        component: () => import('@/views/Text.vue'),
      },
    ],
  },
];

export const routes = [
  ...appRoutes,
  otherRoute,
];
