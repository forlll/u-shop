import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 引入menu模块
import menu from "./module/menu"  
import role from "./module/role"  
import manager from "./module/manager"  
import cate from "./module/cate"
import goods from './module/goods'
import specs from './module/specs'
import member from './module/member'
import banner from './module/banner'
import seck from './module/seck'
export default new Vuex.Store({
    state:{
        loginInfo:sessionStorage.getItem('loginInfo')? JSON.parse(sessionStorage.getItem('loginInfo')): null
    },
    getters:{
        getUserInfo(state){
            return state.loginInfo
        }
    },
    mutations:{
        CHANGE_USER(state,payload){
            state.loginInfo = payload
            if(payload){
                sessionStorage.setItem('loginInfo',JSON.stringify(payload))
            }else{
                sessionStorage.removeItem('loginInfo')
            }
        }
    },
    actions:{
        changeUserInfoAction(contxt,payload){
            contxt.commit('CHANGE_USER',payload)
        }
    },
    modules:{
        menu,
        role,
        manager,
        cate,
        goods,
        specs,
        member,
        banner,
        seck
    }
})
