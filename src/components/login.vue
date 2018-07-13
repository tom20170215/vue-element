<template>
  <el-form ref="AccountForm" :model="account" :rules="rules" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">管理员登录</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="account.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="pwd">
      <el-input type="password" v-model="account.pwd" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" class="remember" checked>记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import API from '../api/api_user';
export default {
  data () {
    return {
      loading: false,
      account: {
        username: 'admin',
        pwd: '123456'
      },
      rules: {
        username: [
          {required: true, message: '请输入账号', trigger: 'blur'}
        ],
        pwd: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      },
      checked: true
    }
  },
  methods: {
    handleLogin () {
      let that = this;
      this.$refs.AccountForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          let loginParams = {username: this.account.username, pwd: this.account.pwd};
          API.login(loginParams).then(function (result) {
            that.loading = false;
            if(result && result.id){
              localStorage.setItem("access-user", JSON.stringify(result));
              that.$router.push({path: '/'});              
            }else{
              that.$message.error({showClose: true,message: result.errmsg || '登录失败', duration: 2000})
            }
          }, function(err){
            that.loading = false;
            that.$message.error({showClose: true,message: err.toString(),duration: 2000})
          }).catch(function (error) {
            that.loading = false;
            that.$message.error({showClose: true,message: '请求出现异常', duration: 2000})
          })
        }
      })
    }
  }
}
</script>
<style>
  body{
    background:#DFE9FB;
  }
</style>
<style lang="scss" scoped>
  .login-container{
    width:350px;
    border:1px solid #eaeaea;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius:5px;
    padding:35px 35px 15px 35px;
    margin:160px auto;
    background: #fff;
    box-shadow:0 0 25px #cac6c6;
    .title{
      text-align: center;
      color:#505458;
      margin:0 auto 40px auto;
    }
    .remember{
      margin:0 0 35px 0;
    }
  }
</style>
