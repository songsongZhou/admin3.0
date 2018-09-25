<template>
    <div>
        <!--查询-->
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="商品名称">
                <el-input placeholder="支持模糊查询"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="dialogVisible=true">添加</el-button>
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

        <el-dialog
                title="添加banner"
                :visible.sync="dialogVisible"
                width="30%">

            <el-form :model="form" label-width="80px" :rules="rules" ref="form">
                <el-form-item label="标题">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="连接" prop="path">
                    <el-input v-model="form.path"></el-input>
                </el-form-item>

                <el-form-item label="图片" label-width="80px" prop="image">
                    <el-upload
                            :action="api.Hallowmas+'/uploadImage'"
                            accept="image/*"
                            list-type="picture-card"
                            :on-success="handleBannerSuccess"
                            :on-preview="handleBannerPreview">
                        <i class="el-icon-plus"></i>
                    </el-upload>

                    <el-dialog :visible.sync="dialogBannerVisible" append-to-body>
                        <img width="100%" :src="form.image" alt="">
                    </el-dialog>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
             <el-button @click="dialogVisible = false">取 消</el-button>
             <el-button type="primary" @click="addBanner('form')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {getBanner,addBanner} from "../../axios/api";
    import api from '@/axios/url'

    export default {
        data() {
            return {
                api,
                dialogVisible:false,
                form:{
                    title:"",
                    image:"",
                    path:""
                },
                dialogBannerVisible:false,
                rules:{
                    path:[{required: true, message: '请输入连接', trigger: 'blur'}],
                    image:[{required: true, message: '请上传一张720x300的banner图片', trigger: 'blur'}]
                },
                bannerData: []
            }
        },
        created() {
            this.getBannerData()
        },
        methods: {
            getBannerData() {
                getBanner().then(res => {
                    console.log(res)
                    this.bannerData = res.data.data
                })
            },
            addBanner(form){
                var that=this
                this.$refs[form].validate((valid) => {
                    if(valid){
                        addBanner(that.form.title,that.form.path,that.form.image).then(res=>{
                            if(res.data.code==1){
                                that.$message({
                                    message: '新增成功！',
                                    type: 'success'
                                });
                                this.dialogVisible=false
                            }else{
                                that.$message({
                                    message: res.data.msg,
                                    type: 'error'
                                });
                            }
                        })

                    }
                })
            },
            handleBannerSuccess: function (response) {
                this.form.image = response.data
            },
            handleBannerPreview(file){
                this.form.image = file.url;
                this.dialogBannerVisible = true;
            }
        }
    }
</script>

<style scoped>

</style>
