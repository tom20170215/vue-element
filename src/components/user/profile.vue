<template>
    <el-row>
        <el-col :span="24" class="wrap-breadcrumb" v-loading='loading'>
            <el-breadcrumb>
                <el-breadcrumb-item :to="{path: '/'}"><b>首页</b></el-breadcrumb-item>
                <el-breadcrumb-item>设置</el-breadcrumb-item>
                <el-breadcrumb-item>个人信息</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>
        <el-col :span="12">
            <el-form :model="form" ref="form" label-width="80px" :rules="rules">
                <el-form-item label="账号">
                    <el-input v-model="form.account" disabled></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="form.nickname"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type='primary' @click.native="handleSaveProfile">修改并保存</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    import API from '../../api/api_user'
    import BUS from '../../bus'
    export default {
        data() {
            return {
                form: {
                    account: '',
                    nickname: '',
                    name: '',
                    email: ''
                },
                rules: {
                    nickname: [
                        {required: true, message: '请输入昵称', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur,change'}
                    ]
                },
                loading: false
            }
        },
        methods: {
            handleSaveProfile() {
                let that = this;
                this.$refs.form.validate(valid => {
                    if (valid) {
                        that.loading = true;
                        let args = {
                            nickname: that.form.nickname,
                            name: that.form.name,
                            email: that.form.email
                        };
                        API.changeProfile(args).then(function (result) {
                            that.loading = false;
                            if (result && parseInt(result.errcode) === 0) {
                                let user = JSON.parse(window.localStorage.getItem('access-user'));
                                user.nickname = that.form.nickname;
                                user.name = that.form.name;
                                user.email = that.form.email;
                                localStorage.setItem('access-user',JSON.stringify(user));
                                BUS.$emit('setNickName',that.form.nickname);
                                that.$message.success({showClose: true, message: '修改成功', duration: 2000});
                            } else {
                                that.$message.error({showClose: true, message: result.errmsg, duration: 2000});
                            }
                        }, function (err) {
                            that.loading = false;
                            that.$message.error({showClose: true, message: err.toString(), duration: 2000});
                        }).catch(function (error) {
                            that.loading = false;
                            console.log(error);
                            that.$message.error({showClose: true, message: '请求失败', duration: 2000});
                        });
                    }
                })
            }
        }   
    }
</script>

<style lang="scss" scoped>

</style>

