<template>
    <div>
        <!--查询-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="昵称">
                <el-input v-model="formInline.nickname" placeholder="昵称"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="formInline.userName" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="dialogFormVisible = true">添加账号</el-button>
            </el-form-item>
        </el-form>
        <!--表格数据-->
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="createTime"
                    label="创建日期"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="nickname"
                    label="昵称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="userName"
                    label="用户名">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="{dialogVisible=true,tableIndex=scope.$index}" type="text" size="small">删除</el-button>
                    <el-button type="text" size="small" @click="{dialogFormVisible=true,form=tableData[scope.$index]}">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--添加用户-->
        <el-dialog title="添加用户" :visible.sync="dialogFormVisible" center width="400px" :label-width="formLabelWidth">
            <el-form :model="form" :rules='registerRules' ref="form">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="form.userName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="form.nickname" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password" v-show="form.password==''">
                    <el-input v-model="form.password" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="账号状态" prop="password" v-show="tableIndex=0">
                    <el-switch
                            v-model="form.del"
                            active-value="1"
                            inactive-value="0"
                            active-text="启用"
                            inactive-text="停用">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser('form')">确 定</el-button>
            </div>
        </el-dialog>
        <!--删除用户提示-->
        <el-dialog
                title="警告⚠️"
                :visible.sync="dialogVisible"
                width="30%">
            <span>确定删除该用户？</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="delUser()">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    import {getUsers, addOrUpdateUser, delUser} from "../../axios/api";

    export default {
        data() {
            return {
                formInline: {
                    nickname: '',
                    userName: ''
                },
                tableData: [],
                tableIndex:0,
                dialogFormVisible: false,
                dialogVisible: false,
                form: {
                    id:0,
                    userName: '',
                    nickname: '',
                    password: '',
                    del:1
                },
                registerRules: {
                    userName: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    nickname: [
                        {required: true, message: '请输入昵称', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ]
                },
                formLabelWidth: '80px'
            }
        },
        created() {
            this.getData(1)
        },
        methods: {
            onSubmit: function () {
                alert(this.formInline.nickname)
            },
            getData: function (current) {
                getUsers(current).then(res => {
                    this.tableData = res.data.records
                })
            },
            addUser(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        addOrUpdateUser(this.form.id, this.form.userName, this.form.password, this.form.nickname, this.form.del).then(res => {
                            this.dialogFormVisible=false
                            this.$message({
                                message: res.data.msg,
                                type: res.data.code == 1 ? 'success' : 'error'
                            })
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            delUser() {
                delUser(this.tableData[this.tableIndex].id).then(res => {
                    if (res.data.code == 1) {
                        this.tableData.splice(this.tableIndex, 1);
                    }
                    this.dialogVisible = false
                    this.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: res.data.code == 1 ? 'success' : 'error'
                    })

                    this.tableIndex=0 //重置一下index
                })
            },
            userStatusSwitch(res){
                console.log(res)
            }
        }


    }
</script>

<style scoped>

</style>
