import Vue from 'vue'
import Vuex from 'vuex'
import {getUser} from "../axios/api";
import store from "../store";

Vue.use(Vuex)

const state = {
	adminInfo: {
		avatar: 'default.jpg'
	},
}

const mutations = {
	saveAdminInfo(state, adminInfo){
		state.adminInfo = adminInfo;
	}
}

const actions = {
	async getAdminData({commit}){

		try{
            getUser(store.fetch("userId")).then(res=>{
                if (res.data.code == 1) {
                    commit('saveAdminInfo', res.data);
                }else{
                    throw new Error(res)
                }
            })
		}catch(err){
			console.log('您尚未登陆或者session失效')
		}
	}
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
    fetch (key) {
        return JSON.parse(window.localStorage.getItem(key) || '[]')

    },
    save (key,todo) {    // watch所监听的函数名称
        window.localStorage.setItem(key, JSON.stringify(todo));
    }
})
