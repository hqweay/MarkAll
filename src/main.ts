import Vue from 'vue';
import App from './renderer/App.vue';
import router from './renderer/router';
import store from './renderer/store';

// elementUi
import ElementUI from 'element-ui'; //引入js
import 'element-ui/lib/theme-chalk/index.css'; //引入css
import './renderer/assets/element-variables.scss'; //引入自定义样式
Vue.use(ElementUI)


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

