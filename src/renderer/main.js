import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

// elementUi
import ElementUI from 'element-ui' //引入js
import 'element-ui/lib/theme-chalk/index.css'//引入css
import './assets/element-variables.scss' // 引入自定义样式
Vue.use(ElementUI)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios

// Vue.prototype.$ajax = axios;

Vue.config.productionTip = false

// 引入mockjs
require('./mock')



/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
