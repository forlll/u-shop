// 引入接口文件
import {getGoodsList,getGoodsCount} from '../../../uitl/axios'

const state = {
    goodsList:[],
    size:2,//查询条数
    page:1,//页码数
    countNum:0
}

const getters = {
    getGoodsSize(state){
        return state.size
    },
    getGoodsList(state) {
        return state.goodsList
    },
    getCount(state){
        return state.countNum
    },
    getGoodsPage(state){
        return state.page
    }
}

const mutations = {
    REQ_GOODSLIST(state, payload) {
        state.goodsList = payload
    },
    REQ_GOODSCOUNT(state,payload){
        state.countNum = payload
    },
    CHANGE_PAGE(state,payload){
        state.page = payload
    }
}

const actions = {
    getGoodsListAction(payload) {
        getGoodsList({
            size: payload.state.size,
            page: payload.state.page
        })
            .then(res => {
                if (res.data.code === 200) {
                    let list = res.data.list ? res.data.list:[];
                    payload.commit("REQ_GOODSLIST", list);
                    if(payload.state.page !=1 && list.length==0){
                        payload.dispatch("changePageAction",payload.state.page-1);
                        return
                    }
                }
            })
    },
    getGoodsCountAction(payload) {
        getGoodsCount()
        .then(res=>{
            if(res.data.code===200){
                payload.commit('REQ_GOODSCOUNT',res.data.list[0].total)
            }
        })
    },
    changePageAction(context,payload){
        context.commit('CHANGE_PAGE',payload)
        context.dispatch('getGoodsListAction')
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}