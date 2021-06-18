import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//  导入全局样式表
import './assets/css/global.css'

import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://1.117.153.199:8181//'
axios.interceptors.request.use(config => {
  console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  data: function () {
    return {
      // 全局变量存放用户的数据
      USER: [{
        userName: null,
        userId: null,
        userPwd: null,
        userPhone: null,
        userCredit: null,
        userRole: null,
        userCreateTime: null
      }],
      ASSOCIATION: [{
        assId: null
      }]
    }
  },
  render: h => h(App)
}).$mount('#app')
