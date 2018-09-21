<template>
    <div class="container">

        <el-card class="box-card">
            <h3>吉安乐宜嘉后台管理系统</h3>
            <el-form label-position="top" label-width="80px" :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" :loading="loginLoading">登录</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>

    import {login} from "../../axios/api";
    export default {
        data() {
            return {
                loginLoading: false,
                ruleForm: {
                    name: '',
                    password: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                var that = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        that.loginLoading = true
                        login(that.ruleForm.name, that.ruleForm.password).then(res => {
                            if (res.data.code == 1) {
                                that.$message({
                                    message: '欢迎👏登录吉安乐宜嘉后台管理系统！',
                                    type: 'success'
                                });
                                that.$router.push('main')
                            } else {
                                that.$message.error(res.data.msg);
                            }
                        }).catch(function (req) {
                            console.log(req)
                        })
                        that.loginLoading = false
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .container {
        background-image: linear-gradient(to top, #4481eb 0%, #04befe 100%);
        height: 100%;
        width: 100%;
        position: absolute;

    }

    .box-card {
        margin: 0 auto;
        width: 480px;
        top: 30%;
        position: relative;
    }
</style>
