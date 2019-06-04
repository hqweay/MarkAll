import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
    {
        path: '/',
        // redirect: '/template',//跳转
        name: 'index',//命名路由
    },
    {
        path: '/movie',
        name: 'movie',//命名路由
        component: () => import('@/views/movie/movie'),
    },
    {
        path: '/template',
        name: 'template',//命名路由
        component: () => import('@/views/template/index'),
    }, {
        path: '/template/info/:name',
        name: 'template-info',//命名路由
        component: () => import('@/views/template/info'),
    }
];
export default new Router({
    mode: "history",
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
});
