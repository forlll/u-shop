// 引入接口文件
import { getSpecsList,getSpecsCount } from '../../../uitl/axios'

const state = {
    specsList: [],
    size: 2,//条数
    page: 1,// 页码 
    countNum: 0 //总条数
}

const getters = {
    getSpecsSize(state){
        return state.size
    },
    getSpecsList(state) {
        return state.specsList
    },
    getCount(state){
        return state.countNum
    },
    getSpecsPage(state){
        return state.page
    }
}

const mutations = {
    REQ_USERLIST(state, payload) {
        state.specsList = payload
    },
    REQ_USERCOUNT(state,payload){
        state.countNum = payload
    },
    CHANGE_PAGE(state,payload){
        state.page = payload
    }
}

const actions = {
    getSpecsListAction(payload) {
        getSpecsList({
            size: payload.state.size,
            page: payload.state.page
        })
            .then(res => {

                if (res.data.code === 200) {
                    let list = res.data.list ? res.data.list:[];
                    payload.commit("REQ_USERLIST", list);
                    if(payload.state.page !=1 && list.length==0){
                        payload.dispatch("changePageAction",payload.state.page-1);
                        return
                    }
                }
            })
    },
    getSpecsCountAction(payload) {
        getSpecsCount()
        .then(res=>{
            if(res.data.code===200){
                payload.commit('REQ_USERCOUNT',res.data.list[0].total)
            }
        })
    },
    changePageAction(context,payload){
        context.commit('CHANGE_PAGE',payload)
        context.dispatch('getSpecsListAction')
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}