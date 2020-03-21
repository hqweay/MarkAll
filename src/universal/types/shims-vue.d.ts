import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';
import logger from '#/utlis/logger';
declare module '*.vue' {
  export default Vue
}

// 全局声明，解决查找模块路径的问题。
declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter, // 声明 Vue 下有这个东西
    $route: Route,
    $logger: typeof logger
    // $notify: ElNotification
  }
}
