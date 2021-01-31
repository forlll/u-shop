// 引入接口文件
import {getBannerList} from '../../../uitl/axios'

const state = {
    bannerList:[]
}

const getters = {
    getBannerList(state){
        return state.bannerList
    }
}

const mutations = {
    REQ_BANNERLIST(state,payload){
        state.bannerList = payload
    }
}

const actions = {
    getBannerListAction({commit}){
        getBannerList()
        .then(res=>{
            if(res.data.code===200){
                commit("REQ_BANNERLIST",res.data.list)
            }
        })
    }
}

export default{
    state,
    getters,
    mutations,
    actions,
    namespaced:true
}