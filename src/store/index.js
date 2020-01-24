import { getMajorList } from '@/api/getMajorSet'
// 1.引入 vue
import Vue from 'vue';
// 2.引入vuex
import Vuex from "vuex"
// 3.调用 vuex
Vue.use(Vuex);
// 4.定义仓库的 state、getters、mutations、actions、modules
const state = {
    name:"泰勒斯威夫特",
    majorList:[],
    siderbar:false
}
const getters = {

}
const mutations = {
    // 除了接收到state，还能接受一个 payload（参数）
    setName(state,payload){
        state.name = payload.newName
    },
    setSiderbar(state,payload){
        state.siderbar = !state.siderbar
    },
    setMajorList(state,payload){
        state.majorList = payload.newList
    }
}
const actions = {
    // context是上下文对象，也可以直接理解为仓库的实例对象
    setNameSync:function(context,payload){
        // 异步操作
        setTimeout(() => {
            context.commit({
                type:"setName",
                ...payload
            });
        }, 1000);
    },
    getMajorList:function(context){
        getMajorList().then(data=>{
            context.commit({
                type:"setMajorList",
                newList:data.result
            })
        })
    }
}
// 5.实例化仓库对象
const store = new Vuex.Store({
    // 选项配置：state、getters、mutations、actions、modules
    state:state,
    getters,
    mutations,
    actions
});
// 6.暴露仓库实例对象
export default store;