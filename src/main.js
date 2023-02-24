import Vue from 'vue'
import App from './App.vue'  //所有组件的父组件
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


Vue.config.productionTip = false

import '@/icons'
import '@wangeditor/editor/dist/css/style.css'
import '@/assets/iconfont/iconfont.css'

// 项目的入口文件

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
