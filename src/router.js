import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: () => import("@/views/admin/login")
        },
        {
            path: '/main',
            component: () => import("@/views/main"),
            children: [{
                path: '/',
                component: () => import("@/views/default"),
            }, {
                path: '/users',
                component: () => import("@/views/admin/users"),
                meta: ['添加数据', '添加商铺']
            },
                {
                    path: '/customers',
                    component: () => import("@/views/customers"),
                    meta: ['添加数据', '添加商铺'],
                },
                {
                    path: '/orders',
                    component: () => import("@/views/order/orders"),
                    meta: ['添加数据', '添加商铺'],
                },
                {
                    path: '/goodsList',
                    component: () => import("@/views/goods/goodsList")
                },
                {
                    path: '/uploadGoods',
                    component: () => import("@/views/goods/uploadGoods")
                },
                {
                    path: '/skuList',
                    component: () => import("@/views/goods/skuList")
                },
                {
                    path: '/banner',
                    component: () => import("@/views/weixin/banner")
                }, {
                    path: '/customModel',
                    component: () => import("@/views/weixin/customModel")
                }, {
                    path: '/company',
                    component: () => import("@/views/company")
                }, {
                    path: '/category',
                    component: () => import("@/views/category")
                }]
        }
    ]
})
