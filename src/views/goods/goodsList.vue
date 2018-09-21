<template>
    <div>
        <!--查询-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="商品名称">
                <el-input v-model="formInline.name" placeholder="支持模糊查询"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addGoods">添加商品</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="tableData">
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
                    <el-button @click="{dialogModuleVisible=true,selectGoodsId=scope.row.id}" type="text" size="small">添加至活动</el-button>
                </template>
            </el-table-column>
        </el-table>


        <el-dialog title="商品参加活动" :visible.sync="dialogModuleVisible">
            <el-table
                    @row-dblclick="handleAddGoods2Module"
                    :data="tableModuleData"
                    style="width: 100%">
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
            </el-table>
        </el-dialog>

    </div>
</template>

<script>
    import {getGoods,getModule,addGoods2Module} from "../../axios/api";

    export default {
        data() {
            return {
                dialogModuleVisible:false,
                tableData: [],
                tableModuleData:[],
                selectGoodsId:0,
                formInline: {
                    name: ''
                }
            }
        },
        created() {
            this.getData(1)
            this.getModuleData()
        },
        methods: {
            getModuleData(){
                getModule().then(res=>{
                    this.tableModuleData=res.data.data
                })
            },
            getData: function (current) {
                getGoods(current).then(res => {
                    console.log(res)
                    this.tableData = res.data.records
                })
            },
            onSubmit: function () {

            },
            addGoods() {
                this.$router.push("uploadGoods")
            },
            handleAddGoods2Module(row){
                if(this.selectGoodsId==0){
                    return false;
                }
                addGoods2Module(row.id,this.selectGoodsId).then(res=>{
                    if(res.data.code==1){
                        this.dialogModuleVisible=false
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                    console.log(res)
                })
            }
        }
    }
</script>

<style scoped>

</style>
