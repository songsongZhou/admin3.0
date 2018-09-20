<template>
    <div>
      <el-container>
        <el-container>
          <el-aside width="200px" style="min-height: 100%">
            <el-menu
              router
              :default-active="activeIndex"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">

              <el-menu-item index="users">
                <i class="el-icon-setting"></i>
                <span slot="title">系统用户</span>
              </el-menu-item>


              <el-menu-item index="customers">
                <i class="el-icon-location"></i>
                <span slot="title">客户管理</span>
              </el-menu-item>


              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-goods"></i>
                  <span>商品管理</span>
                </template>
                <el-menu-item index="category">商品分类</el-menu-item>
                <el-menu-item index="uploadGoods">商品上传</el-menu-item>
                <el-menu-item index="goodsList">商品列表</el-menu-item>
                <el-menu-item index="skuList">商品SKU</el-menu-item>
              </el-submenu>

              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-mobile-phone"></i>
                  <span>微信商城</span>
                </template>
                <el-menu-item index="banner">banner设置</el-menu-item>
                <el-menu-item index="company">公司简介</el-menu-item>
                <el-menu-item index="customModel">专区模块</el-menu-item>
              </el-submenu>

              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>订单管理</span>
                </template>
                <el-menu-item index="orders">订单中心</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-aside>

          <el-container>

            <el-header style="text-align: right; font-size: 12px">
              <el-dropdown>
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>查看</el-dropdown-item>
                  <el-dropdown-item>新增</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span>王小虎</span>
            </el-header>

            <el-main>
              <keep-alive>
                <router-view></router-view>
              </keep-alive>
            </el-main>
          </el-container>

        </el-container>
      </el-container>
    </div>
</template>

<script>
  export default {
      data(){
        return({

        })
      },
      computed:{
        activeIndex(){
          return this.$route.path.replace('/','')
        }
      },

    }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-aside{

  }
  .el-main{
    height: 100%;
    overflow: auto;
  }
</style>
