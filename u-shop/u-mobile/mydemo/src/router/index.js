import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      component: ()=>import('@/pages/index'),
      children:[
        {
          path:'/home',
          component: ()=>import('@/views/home')
        },
        {
          path:'/cate',
          component: ()=>import('@/views/cate')
        },
        {
          path:'/cart',
          component: ()=>import('@/views/cart')
        },
        {
          path:'/mine',
          component: ()=>import('@/views/mine')
        },
        {
          path:'',
          redirect:'/home'
        }
      ]
    },
    {
      path:'/login',
      component:()=>import('@/pages/login')
    },
    {
      path:'/register',
      component:()=>import('@/pages/register')
    },
    {
      path:'/list',
      component:()=>import('@/pages/list')
    },
    {
      path:'/detail',
      component:()=>import('@/pages/detail')
    },
    {
      path:'*',
      redirect:'/index'
    }
  ]
})
