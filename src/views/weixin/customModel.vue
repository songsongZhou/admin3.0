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
        </el-form>
        <el-table
                :data="tableData"
                style="width: 100%"
                :default-sort = "{prop: 'createTime', order: 'descending'}">
            <el-table-column
                    prop="createTime"
                    label="创建日期"
                    sortable>
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="活动名称"
                    sortable>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button type="text" @click="getModuleGoodsData(scope.row.id)" size="small">查看</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="活动中商品" :visible.sync="dialogGoodsVisible">
            <el-table :data="tableModuleGoods" >
                <el-table-column label="商品名称" prop="goodsName"></el-table-column>
                <el-table-column label="商品描述" prop="goodsSubName"></el-table-column>
                <el-table-column label="图片">
                    <template slot-scope="scope">
                        <img :src="scope.row.goodsImage" width="80" height="80"/>
                    </template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <el-button  type="text" size="small">移除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
    import {getModule,getModuleGoods} from "../../axios/api";

    export default {
        data(){
            return{
                dialogGoodsVisible:false,
                tableData:[],
                tableModuleGoods:[]
            }
        },
        created(){
            this.getData();
        },
        methods:{
            getData(){
                getModule().then(res=>{
                    this.tableData=res.data.data
                })
            },
            getModuleGoodsData(moduleId){
                this.dialogGoodsVisible=true
                getModuleGoods(moduleId).then(res=>{
                    console.log(res)
                    this.tableModuleGoods=res.data.data
                })
            }
        }
    }
</script>

<style scoped>

</style>
