<template>
    <el-row>
        <el-col :span="24" class="wrap-breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{path: '/'}" @click.native='bus'><b>首页</b></el-breadcrumb-item>
                <el-breadcrumb-item>设置</el-breadcrumb-item>
                <el-breadcrumb-item>修改密码</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>
        <el-col :span="24" class="wrap-main">
            <el-form :model="form" ref="form" label-width="120px">
                <el-form-item label="原始密码">
                    <el-input v-model="form.oldPwd"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input v-model="form.newPwd"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码">
                    <el-input v-model="form.confirmPwd"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click.native="handleChangePwd">提交</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
import BUS from '../../bus'
export default {
  data() {
    return {
      form: {
        oldPwd: "",
        newPwd: "",
        confirmPwd: ""
      }
    };
  },
  methods: {
      handleChangePwd() {
          this.$message.warning({showClose: true, message: '暂未开发', duration: 2000})
      },
      bus() {
          BUS.$emit('backIndex', '/dashboard');
      }
  }
};
</script>

<style lang="scss" scoped>
</style>

