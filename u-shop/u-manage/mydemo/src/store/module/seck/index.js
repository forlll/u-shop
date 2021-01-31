// 引入接口文件
import {getSeckList} from '../../../uitl/axios'

const state = {
    seckList:[]
}

const getters = {
    getSeckList(state){
        return state.seckList
    }
}

const mutations = {
    REQ_SECKLIST(state,payload){
        state.seckList = payload
    }
}

const actions = {
    getSeckListAction({commit}){
        getSeckList()
        .then(res=>{
            if(res.data.code===200){
                commit("REQ_SECKLIST",res.data.list)
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