<template>
    <div>
        <!--查询-->
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="商品名称">
                <el-input placeholder="支持模糊查询"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" >查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" >添加</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="bannerData">
            <el-table-column label="图片">
                <template slot-scope="scope">
                    <img :src="scope.row.image" width="200" height="80"/>
                </template>
            </el-table-column>
            <el-table-column label="标题" prop="title"></el-table-column>
            <el-table-column label="链接" prop="path"></el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small">移除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {getBanner} from "../../axios/api";

    export default {
        data(){
            return{
                bannerData:[]
            }
        },
        created(){
            this.getBannerData()
        },
        methods:{
            getBannerData(){
                getBanner().then(res=>{
                    console.log(res)
                    this.bannerData=res.data.data
                })
            }
        }
    }
</script>

<style scoped>

</style>
