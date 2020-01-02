import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
import './assets/css/base.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from "./store"
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import App from './App.vue'
// 将 vue 的开发提示给关闭
Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(ElementUI);
// 实例化 vue 的根实例，根组件
new Vue({
  store:store,
  router,
  render: h => h(App),
}).$mount('#app')
