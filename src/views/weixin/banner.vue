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

            <el-form :model="form">
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                    <el-input v-model="form.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" :label-width="formLabelWidth">
                    <el-input v-model="form.path" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="banner" :label-width="formLabelWidth">
                    <el-upload
                            :action="api.Hallowmas+'/uploadImage'"
                            accept="image/*"
                            list-type="picture-card"
                            :on-preview="handleSkuPictureCardPreview">
                        <i class="el-icon-plus"></i>
                    </el-upload>

                    <el-dialog :visible.sync="dialogBannerVisible" append-to-body>
                        <img width="100%" :src="skuForm.skuImage" alt="">
                    </el-dialog>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
             <el-button @click="dialogVisible = false">取 消</el-button>
             <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {getBanner} from "../../axios/api";

    export default {
        data() {
            return {
                dialogVisible:false,
                form:{},
                dialogBannerVisible:false,
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
            }
        }
    }
</script>

<style scoped>

</style>
