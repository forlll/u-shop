import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store'

function hasUrl(url){
  return Store.getters.getUserInfo.menus_url.some(item=>item==url)
}

Vue.use(Router)

export const indexRouters = [
  {
    path:'/menu',
    component:()=>import('@/views/menu/menu'),
    name:'菜单管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/menu') ? next() :next('/home')
    }
  },
  {
    path:'/role',
    component:()=>import('@/views/role/role'),
    name:'角色管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/role') ? next() :next('/home')
    }
  },
  {
    path:'/manager',
    component:()=>import('@/views/manager/manager'),
    name:'管理员管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/manager') ? next() :next('/home')
    }
  },
  {
    path:'/goods',
    component:()=>import('@/views/goods/goods'),
    name:'商品管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/goods') ? next() :next('/home')
    }
  },
  {
    path:'/classfiy',
    component:()=>import('@/views/classfiy/classfiy'),
    name:'商品分类',
    beforeEnter: (to, from, next) => {
      hasUrl('/classfiy') ? next() :next('/home')
    }
  },
  {
    path:'/specs',
    component:()=>import('@/views/specs/specs'),
    name:'商品规格',
    beforeEnter: (to, from, next) => {
      hasUrl('/specs') ? next() :next('/home')
    }
  },
  {
    path:'/member',
    component:()=>import('@/views/member/member'),
    name:'会员管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/member') ? next() :next('/home')
    }
  },
  {
    path:'/banner',
    componentn:()=>import('@/views/banner/banner'),
    name:'轮播图管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/banner') ? next() :next('/home')
    }
  },
  {
    path:'/seck',
    component:()=>import('@/views/seck/seck'),
    name:'秒杀管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/seck') ? next() :next('/home')
    }
  }
]
export default new Router({
  routes: [
    {
      path:'/login',
      component:()=>import ('@/pages/login')
    },
    {
      path:'/index',
      component:()=>import ('@/pages/index'),
      children:[
        {
          path:'/home',
          component:()=>import('@/views/home'),
        },
        ...indexRouters,
        {
          path:'',
          redirect:'/home'
        }
      ]
    },
    {
      path:'*',
      redirect:'/login'
    }
  ]
})
