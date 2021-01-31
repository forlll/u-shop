// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'


// 引入全局重置样式css
import './assets/css/reset.css'

// 引入element-ui框架
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(elementUI)

// 引入全局组件
import commontT from '@/common/index'
for(let i in commontT){
  Vue.component(i,commontT[i])
}

// 创建一个图片地址
Vue.prototype.$imgUrl = "http://localhost:8000"

//全局引入echarts
let Echarts = require('echarts')
Vue.prototype.$Echarts = Echarts

// 全局导航守卫之登录
router.beforeEach((to,from,next)=>{
  if(to.path=='/login'){
    next();
    return
  }
  // 如果你有登录状态则nexts
  if(store.getters.getUserInfo){
    next();
    return
  }
  // 都没有就强制跳转到登录页面
  next('/login')
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
