<template>
    <div>
        <el-form ref="goodsForm" :model="goodsForm" :rules="goodsRules" label-width="120px">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>商品基础信息</span>
                </div>
                <div>
                    <el-form-item label="商品名称" prop="goodsName">
                        <el-input v-model="goodsForm.goodsName" clearable style="width: 50%"></el-input>
                    </el-form-item>

                    <el-form-item label="商品标题">
                        <el-input v-model="goodsForm.goodsSubName" clearable style="width: 50%"></el-input>
                    </el-form-item>

                    <el-form-item label="分类" prop="categoryId">
                        <el-select v-model='goodsForm.categoryId' placeholder="请选择">
                            <el-option
                                    v-for="item in categoryData"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="商品图片" prop="goodsImage">
                        <el-upload
                                :action="api.Hallowmas+'/uploadImage'"
                                accept="image/*"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-success="handleSuccess"
                                :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>

                        <el-dialog :visible.sync="dialogVisible" append-to-body>
                            <img width="100%" :src="goodsForm.goodsImage" alt="">
                        </el-dialog>

                    </el-form-item>

                    <el-form-item label="价格">
                        {{goodsForm.price}} 元
                    </el-form-item>
                </div>
            </el-card>

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>商品规格</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">添加规格
                    </el-button>
                </div>
                <div>
                    <el-form-item label="规格">
                        <el-table
                                :data="skuTableData"
                                border>
                            <el-table-column prop="skuName" label="名称"></el-table-column>
                            <el-table-column prop="skuPrice" label="价格"></el-table-column>
                            <el-table-column prop="skuLinePrice" label="划线价格"></el-table-column>
                            <el-table-column prop="skuCode" label="编号"></el-table-column>
                            <el-table-column prop="stock" label="库存"></el-table-column>
                            <el-table-column label="图片">
                                <template slot-scope="scope">
                                    <img :src="scope.row.skuImage" width="40" height="40"/>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button
                                            size="mini"
                                            @click="handleEdit(scope.$index, scope.row)">编辑
                                    </el-button>
                                    <el-button
                                            size="mini"
                                            type="danger"
                                            @click="handleDelete(scope.$index, scope.row)">删除
                                    </el-button>
                                </template>
                            </el-table-column>

                        </el-table>
                    </el-form-item>
                </div>
            </el-card>

            <!--添加商品sku的弹窗-->
            <el-dialog title="添加商品规格" :visible.sync="dialogFormVisible" center width="30%">
                <el-form ref="skuForm" :model="skuForm" :rules="skuFormRules" label-width="80px">
                    <el-form-item label="名称" prop="skuName">
                        <el-input v-model="skuForm.skuName" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="价格" prop="skuPrice">
                        <el-input v-model="skuForm.skuPrice" clearable type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="划线价格">
                        <el-input v-model="skuForm.skuLinePrice" clearable type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="库存" prop="stock">
                        <el-input v-model="skuForm.stock" clearable type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="编号">
                        <el-input v-model="skuForm.skuCode" clearable type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="图片" prop="skuImage">
                        <el-upload
                                :action="api.Hallowmas+'/uploadImage'"
                                accept="image/*"
                                list-type="picture-card"
                                :on-preview="handleSkuPictureCardPreview"
                                :on-remove="handleSkuRemove"
                                :on-success="handleSkuSuccess">
                            <i class="el-icon-plus"></i>
                        </el-upload>

                        <el-dialog :visible.sync="dialogSkuVisible" append-to-body>
                            <img width="100%" :src="skuForm.skuImage" alt="">
                        </el-dialog>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addSKU('skuForm')">确 定</el-button>
                </div>
            </el-dialog>
            <!--添加商品sku的弹窗-->

            <el-form-item>
                <el-button type="primary" @click="onSubmit('goodsForm')">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {getCategorys, addOrUpdateGoods,delImages} from "../../axios/api";
    import api from '@/axios/url'

    export default {
        data() {
            return {
                api,
                dialogFormVisible: false,
                dialogVisible: false,
                dialogSkuVisible: false,
                categoryData: [],
                goodsForm: {//goods对象
                    goodsName: '',
                    goodsSubName: '',
                    categoryId: '',
                    goodsImage: '',
                    price: "",

                },
                goodsRules: {
                    goodsName: [
                        {required: true, message: '请输入商品名称', trigger: 'blur'}
                    ],
                    categoryId: [
                        {required: true, message: '请选择商品分类', trigger: 'blur'}
                    ],
                    goodsImage: [
                        {required: true, message: '请上传一张图片', trigger: 'blur'}
                    ]
                },
                skuForm: {//sku对象
                    skuImage: "",
                    skuName: "",
                    skuPrice: '',
                    skuLinePrice: '',
                    skuCode: "",
                    stock: ''
                },
                skuTableData: [],
                skuFormRules: {
                    skuName: [
                        {required: true, message: '请输入规格名称', trigger: 'blur'}
                    ],
                    skuPrice: [
                        {required: true, message: '请输入价格', trigger: 'blur'}
                    ],
                    stock: [
                        {required: true, message: '请填写库存', trigger: 'blur'}
                    ],
                    skuImage: [
                        {required: true, message: '请上传一张规格图片', trigger: 'blur'}
                    ],
                },
                goodsVo: {
                    goods: {},
                    goodsSkus: []
                },
            }
        },
        created() {
            getCategorys(1).then(res => {
                this.categoryData = res.data.records
            })
        },

        methods: {
            onSubmit(goodsForm) {
                this.$refs[goodsForm].validate((valid) => {
                    if (valid) {
                        this.goodsVo.goods = this.goodsForm
                        this.goodsVo.goodsSkus = this.skuTableData

                        console.log('传参', this.goodsVo)
                        console.log('submit!', JSON.stringify(this.goodsVo));

                        if(this.skuTableData.length<=0){
                            this.$message({
                                message: '请至少添加一个规格',
                                type: 'error'
                            });
                            return false
                        }
                        addOrUpdateGoods(this.goodsVo).then(res => {
                            if(res.data.code==1){
                                this.$message({
                                    message: '商品创建成功！',
                                    type: 'success'
                                });
                            }else{
                                this.$message({
                                    message: res.data.msg,
                                    type: 'error'
                                });
                            }
                        })
                    }
                })
            },
            addSKU(skuForm) {
                this.$refs[skuForm].validate((valid) => {
                    if (valid) {
                        this.dialogFormVisible = false
                        this.skuTableData.push({...this.skuForm})// {...this} 这种写法可以防止每个skuForm对象都一样
                        this.formatPrice(this.skuTableData)//取价格区间
                    }
                })

            },
            formatPrice: function (data) {
                if (data.length > 0) {
                    if (data.length == 1) {
                        this.goodsForm.price = data[0].skuPrice
                    } else {
                        var priceArr=[];
                        for (let i = 0; i < data.length; i++) {
                            priceArr[i]=data[i].skuPrice
                        }
                        var minPrice = Math.min.apply(Math, priceArr)
                        var maxPrice = Math.max.apply(Math, priceArr)
                        this.goodsForm.price = minPrice + "-" + maxPrice
                    }
                }
            },
            handleSuccess: function (response) {
                this.goodsForm.goodsImage = response.data
                console.log(response)
            },
            handleRemove(file, fileList) {
                console.log("del"+file, fileList);
                var imgUrl=file.url.split("/");
                console.log("图片地址"+imgUrl[imgUrl.length])
                delImages("goods-image/"+imgUrl[imgUrl.length]).then(res=>{
                    console.log(res)
                })
                console.log("del"+file, fileList);
            },
            handlePictureCardPreview(file) {
                this.goodsForm.goodsImage = file.url;
                this.dialogVisible = true;
            },

            // SKU 部分
            handleEdit(index, row) {
                console.log(row)
            },
            handleDelete(index, row) {
                console.log(row)
            },
            handleSkuSuccess: function (response) {
                this.skuForm.skuImage = response.data
                console.log(response)
            },
            handleSkuRemove(file, fileList) {
                var imgUrl=file.split(",");
                console.log("图片地址"+imgUrl[imgUrl.length])
                delImages(imgUrl[imgUrl.length]).then(res=>{
                    console.log(res)
                })
                console.log("del"+file, fileList);
            },
            handleSkuPictureCardPreview(file) {
                this.skuForm.skuImage = file.url;
                this.dialogSkuVisible = true;
            }
            // SKU 部分
        }
    }
</script>

<style scoped>
    .box-card {
        margin-bottom: 12px
    }
</style>
