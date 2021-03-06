import Vue from 'vue';
import App from './renderer/App.vue';
import router from './renderer/router';
import store from './renderer/store';

// elementUi
import ElementUI from 'element-ui'; //引入js
import './renderer/assets/styles/element-variables.scss'; //引入自定义样式
import { loggerEnum, Logger } from '#/utlis/logger';
import ECharts from 'vue-echarts' // refers to components/ECharts.vue in webpack

// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'

// 注册组件后即可使用
Vue.component('v-chart', ECharts)

// 挂载 logger 至 Vue
Vue.prototype.$logger = new Logger(loggerEnum.render);

Vue.use(ElementUI);

Vue.config.productionTip = false;



router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');



// 在 global 声明，编译期就不会报错了。
Array.prototype.remove = function (obj: any) {
  let index = this.indexOf(obj);
  if (index > -1) {
    this.splice(index, 1);
  }
}