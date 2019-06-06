import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
    {
        path: '/',
        // redirect: '/template',//跳转
        name: 'index',//命名路由
    }, {
        path: '/movie',
        name: 'movie',
        component: () => import('@/views/movie/movie'),
    }, {
        path: '/template',
        name: 'template',
        component: () => import('@/views/template/index'),
    }, {
        path: '/template/add',
        name: 'template-add',
        component: () => import('@/views/template/add'),
    }, {
        path: '/template/info/:name',
        name: 'template-info',
        component: () => import('@/views/template/info'),
    }, {
        path: '/item',
        name: 'item',
        component: () => import('@/views/item/index'),
    }, {
        path: '/item/template/:temName',
        name: 'item-template',
        component: () => import('@/views/item/index'),
    }, {
        path: '/item/tag/:tagName',
        name: 'item-tag',
        component: () => import('@/views/item/index'),
    }, {
        path: '/item/add/:temName',
        name: 'item-add',
        component: () => import('@/views/item/add'),
    }, {
        path: '/item/info/:id',
        name: 'item-info',
        component: () => import('@/views/item/info'),
    }, {
        path: '/tag',
        name: 'tag',
        component: () => import('@/views/tag/index'),
    }, {
        path: '/tag/add',
        name: 'tag-add',
        component: () => import('@/views/tag/add'),
    }, {
        path: '/tag/info/:name',
        name: 'tag-info',
        component: () => import('@/views/tag/info'),
    }
];
export default new Router({
    mode: "history",
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
});
