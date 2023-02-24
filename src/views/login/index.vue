<template>
        <div class="login">
            <img class="loginBg" src="../../assets/imgs/login_center_bg.5307896.png">
            <svg-icon iconClass="login-mall" class="loginMall"></svg-icon>
            <p class="mailP1">mall-admin-web</p>
        
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
            <el-form-item prop="username" >
                <el-input v-model="ruleForm.username" placeholder="输入用户名">
                    <svg-icon slot="prefix" iconClass="user" style="color:#409eff"></svg-icon>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="ruleForm.password" placeholder="请输入密码">
                    <svg-icon slot="prefix" iconClass="password"  style="color:#409eff"></svg-icon>
                    <svg-icon slot="suffix" iconClass="eye"  style="color:#409eff"></svg-icon>
                </el-input>
            </el-form-item>
            <el-button type="primary" style="width:100%"  @click="submitForm('ruleForm')">登录</el-button>
        </el-form>
        </div>
    </template>
    
    <script>
        import axios from "axios";
    export default {
        data() {
            return {
                ruleForm:{
                    username:"",
                    password:""
                },
                //表单验证规则
                rules:{
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '密码不能小于3位', trigger: 'blur' },
                        { min: 3, max: 15, message: '密码不能小于3位', trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 已输入了符合规则的内容
                    // 把我们输入的用户名和密码发送给后台
                    axios.post('http://8.129.190.90:19527/admin/login',{username:this.ruleForm.username,password:this.ruleForm.password})
                    .then(res=>{
                        console.log('登录',res.data);
                        //如果code==200  登录成功
                        // 1.保存token
                        // 2.跳转首页
                        if(res.data.code == 200){
                            sessionStorage.setItem('vapp-token',res.data.data.tokenHead+res.data.data.token)
                            this.$router.push('/home')
                        }else{
                            // 如果登录不成功，提示失败的原因
                            this.$message.error(res.data.message);
                        }
                    })
                } else {
                    //没有输入内容或输入的内容不符合规则要求
                    return false;
                }
                });
            },
        }
    
    }
    </script>
    <style scoped>
        .loginBg{position: absolute;top: 200px;left:0px;height:auto;width:auto;max-height: 100%;max-width:100%;background: #409eff;z-index: -1;}
        .login{width: 360px;height: 400px;border: 1px solid #ccc;border-top: 10px solid #409eff;border-radius: 4px;padding: 20px;text-align: center;margin: 130px auto;background: #fff;}
        .loginMall{font-size: 46px;color: #409eff;}
        .mailP1{font-size: 22px;color: #409eff;margin: 20px 0;font-weight: 700;}
    </style>
    
    