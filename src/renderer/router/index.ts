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
        path: 'item-list',
        name: 'item-list',
        component: () => import(/* webpackChunkName: "Item" */ '@/views/item/ItemList.vue'),
        meta: {
          title: '条目'
        },
      },
      {
        path: 'tag-list',
        name: 'tag-list',
        meta: {
          title: '标签'
        },
        component: () => import(/* webpackChunkName: "Item" */ '@/views/tag/TagList.vue'),
      },
      {
        path: 'template-list',
        name: 'template-list', // 命名路由
        component: () => import(/* webpackChunkName: "Item" */ '@/views/template/TemplateList.vue'),
        meta: {
          title: '模板'
        },
      },
      {
        path: 'plugin',
        name: 'plugin', // 命名路由
        component: () => import(/* webpackChunkName: "Item" */ '@/views/plugin/Index.vue'),
      },
    ]
  },
  {
    path: '/item',
    name: 'item',
    component: () => import(/* webpackChunkName: "Item-Info" */ '@/views/item/Info.vue'),

    children: [
      {
        path: 'info/:id',
        name: 'item-info',
        meta: {
          title: '条目信息'
        },
        // component: () => import(/* webpackChunkName: "Item-Info" */ '@/views/item/Info.vue'),

      }
    ]
  }
];

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
