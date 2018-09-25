import {fetch} from "./fetch"; //引用fetch.js
import api from './url'; //引用url.js

// 登录
export function login(loginName, password) {
    return fetch({
        url: api.Hallowmas + '/login',
        method: 'post',
        params: {
            loginName: loginName,
            password: password
        }
    })
}


//获取用户列表
export function getUsers(current) {
    return fetch({
        url: api.Hallowmas + '/getUsers',
        method: 'get',//请求方法
        params: {
            current: current //传过去的参数
        }
    })
}

export function getUser(id) {
    return fetch({
        url: api.Hallowmas + '/getUser',
        method: 'POST',
        params: {
            id: id
        }
    })
}

//添加用户
export function addOrUpdateUser(id, userName, password, nickname, del) {
    return fetch({
        url: api.Hallowmas + '/addOrUpdateUser',
        method: 'POST',//请求方法
        params: {
            id: id,
            userName: userName,
            password: password,
            nickname: nickname,
            del: del
        }
    })
}

//删除用户
export function delUser(id) {
    return fetch({
        url: api.Hallowmas + '/delUser',
        method: 'POST',//请求方法
        params: {
            id: id
        }
    })
}


//分类
export function getCategorys(current) {
    return fetch({
        url: api.Hallowmas + '/getCategorys',
        method: 'get',//请求方法
        params: {
            current: current
        }
    })
}

export function addOrUpdateCategory(id, name, icon, sort) {
    return fetch({
        url: api.Hallowmas + '/addOrUpdateCategory',
        method: 'POST',//请求方法
        params: {
            id: id,
            name: name,
            icon: icon,
            sort: sort
        }
    })
}

export function delCategory(id) {
    return fetch({
        url: api.Hallowmas + '/delCategory',
        method: 'POST',//请求方法
        params: {
            id: id
        }
    })
}

//商品上传
export function addOrUpdateGoods(goodsVo) {
    return fetch({
        url: api.Hallowmas + '/addOrUpdateGoods',
        method: 'POST',//请求方法
        data: {
            goodsVo: goodsVo
        }
    })
}

export function getGoods(current) {
    return fetch({
        url: api.Hallowmas + '/getGoods',
        method: 'get',//请求方法
        params: {
            current: current
        }
    })
}


//获取微信用户列表
export function getCustomer(current) {
    return fetch({
        url: api.Hallowmas + '/getCustomer',
        method: 'get',//请求方法
        params: {
            current: current //传过去的参数
        }
    })
}

export function getModule() {
    return fetch({
        url: api.Hallowmas + '/getModule',
        method: 'get'//请求方法
    })
}

export function getModuleGoods(moduleId) {
    return fetch({
        url: api.Hallowmas + '/getModuleGoods',
        method: 'POST',
        params:{
            moduleId:moduleId
        }
    })
}

export function addGoods2Module(moduleId, goodsId) {
    return fetch({
        url: api.Hallowmas + '/addGoods2Module',
        method: 'POST',
        params: {
            moduleId: moduleId,
            goodsId: goodsId
        }
    })
}

export function getBanner() {
    return fetch({
        url: api.Hallowmas + '/getBanner',
        method: 'get'
    })
}

export function addBanner(title,path,image) {
    return fetch({
        url: api.Hallowmas + '/addBanner',
        method: 'POST',
        params:{
            title:title,
            path:path,
            image:image
        }
    })
}


export function delImages(images) {
    return fetch({
        url: api.Hallowmas + '/delImages',
        method: 'POST',
        params:{
            images:images
        }
    })
}



