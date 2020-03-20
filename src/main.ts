import Vue from 'vue';
import App from './renderer/App.vue';
import router from './renderer/router';
import store from './renderer/store';

// elementUi
import ElementUI from 'element-ui'; //引入js
import './renderer/assets/styles/element-variables.scss'; //引入自定义样式



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


//@ts-ignore
Array.prototype.remove = function (obj: any) {
  let index = this.indexOf(obj);
  if (index > -1) {
    this.splice(index, 1);
  }
}
