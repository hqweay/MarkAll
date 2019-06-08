import Vue from 'vue'


import App from './App'
import router from './router'


// elementUi
import ElementUI from 'element-ui' //引入js
import 'element-ui/lib/theme-chalk/index.css'//引入css
import './assets/element-variables.scss' // 引入自定义样式
Vue.use(ElementUI)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))




Vue.config.productionTip = false





/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')
