// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入vant
import vantUI from 'vant'
// 引入vant样式
import 'vant/lib/index.css'
// 引入重置样式
import './assets/css/reset.css'
// 引入rem js文件
import './assets/js/remScale.js'

Vue.use(vantUI)

Vue.config.productionTip = false

//设置图片服务器
Vue.prototype.$imgUrl = 'http://localhost:8000'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
