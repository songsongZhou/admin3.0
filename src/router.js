import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
      {
          path:'/',
          component:()=> import("@/views/login")
      },
      {
          path: '/main',
          component:()=> import("@/views/main"),
          children: [{
              path:'/',
              component:()=> import("@/views/default")
          },{
              path:'/users',
              component:()=> import("@/views/users")
          },
              {
                  path:'/customers',
                  component:()=> import("@/views/customers")
              },
              {
                  path:'/orders',
                  component:()=> import("@/views/order/orders")
              },
              {
                  path:'/goodsList',
                  component:()=> import("@/views/goods/goodsList")
              },
              {
                  path:'/uploadGoods',
                  component:()=> import("@/views/goods/uploadGoods")
              },
              {
                  path:'/skuList',
                  component:()=> import("@/views/goods/skuList")
              },
              {
                  path:'/banner',
                  component:()=> import("@/views/weixin/banner")
              },{
                  path:'/customModel',
                  component:()=> import("@/views/weixin/customModel")
              },{
                  path:'/company',
                  component:()=> import("@/views/company")
              },{
                  path:'/category',
                  component:()=> import("@/views/category")
              }]
      }
  ]
})
