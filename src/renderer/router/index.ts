import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/main', // 跳转
    name: 'index',
    // component: () => import(/* webpackChunkName: "Index" */ '../views/Index.vue'),
  },
  {
    path: '/main',
    name: 'main',
    component: () => import(/* webpackChunkName: "Item" */ '@/views/Index.vue'),
    children: [
      {
        path: 'item',
        name: 'item',
        component: () => import(/* webpackChunkName: "Item" */ '@/views/item/Index.vue'),
      },
      {
        path: 'item/info/:id',
        name: 'item-info',
        component: () => import(/* webpackChunkName: "Item-Info" */ '@/views/item/Info.vue'),
      },
      {
        path: 'tag',
        name: 'tag',
        component: () => import(/* webpackChunkName: "Item" */ '@/views/tag/Index.vue'),
      },
      {
        path: 'template',
        name: 'template', // 命名路由
        component: () => import(/* webpackChunkName: "Item" */ '@/views/template/Index.vue'),
      },
      {
        path: 'plugin',
        name: 'plugin', // 命名路由
        component: () => import(/* webpackChunkName: "Item" */ '@/views/plugin/Index.vue'),
      },
    ]
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
