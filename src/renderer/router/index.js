import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
    {
        path: '/',
        // redirect: '/dashboard',//跳转
        name: 'index',//命名路由
        hidden: true,
    },
    {
        path: '/movie',
        // redirect: '/dashboard',//跳转
        name: 'movie',//命名路由
        component: () => import('@/views/movie/movie'),
        hidden: true
    },
    {
        path: '/template',
        // redirect: '/dashboard',//跳转
        name: 'template',//命名路由
        component: () => import('@/views/template/index'),
        hidden: true
    }
];
export default new Router({
    mode: "history",
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
});
