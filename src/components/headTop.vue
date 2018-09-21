<template>
    <div class="my-head">
        <el-header>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
            </el-breadcrumb>
            <el-dropdown>
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>查看</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <span>用户</span>
        </el-header>
    </div>
</template>

<script>

</script>

<style scoped>
    .my-head {
        display: block;
        font-size: 12px;
        padding: 12px;
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }
</style>
