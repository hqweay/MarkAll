import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/main', // 跳转
    name: 'index',
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/Index.vue'),
    children: [
      {
        // 测试用
        path: 'test',
        name: 'test',
        component: () => import('@/components/imageUploader/index.vue'),
        meta: {
          title: '测试'
        },
      },
      {
        path: 'item-list',
        name: 'item-list',
        component: () => import('@/views/item/ItemList.vue'),
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
        component: () => import('@/views/tag/TagList.vue'),
      },
      {
        path: 'template-list',
        name: 'template-list',
        component: () => import('@/views/template/TemplateList.vue'),
        meta: {
          title: '模板'
        },
      },
      {
        path: 'plugin',
        name: 'plugin', // 命名路由
        component: () => import('@/views/plugin/Index.vue'),
      },
    ]
  },
  {
    path: '/item',
    name: 'item',
    component: () => import('@/views/item/index.vue'),
    children: [
      {
        path: 'info/:id',
        name: 'item-info',
        component: () => import('@/views/item/info/index.vue'),
        meta: {
          title: '条目信息'
        },
      }, {
        path: 'add/:templateName',
        name: 'item-add',
        component: () => import('@/views/item/info/index.vue'),
        meta: {
          title: '添加条目'
        },
      }
    ]
  }, {
    path: '/template',
    name: 'template',
    component: () => import('@/views/template/info/index.vue'),
    children: [
      {
        path: 'info/:id',
        name: 'template-info',
        meta: {
          title: '条目信息'
        },
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
