<template>
    <el-row class="wrap">
        <el-col :span="24" class="wrap-breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{path:'/'}" @click.native="bus"><b>首页</b></el-breadcrumb-item>
                <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>
        
        <el-col :span="24" >
            <!-- 工具条 -->
            <el-col :span="24">
                <el-form :inline="true" :model="filters">
                    <el-form-item>
                        <el-input v-model="filters.name" placeholder="用户名/姓名/昵称" style="min-width:240px;" @keyup.enter.native="handleSearch"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleSearch">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-col>

            <!-- 列表 -->
            <el-table :data="users" highlight-current-row v-loading="loading" style="width:100%;" element-loading-text="拼命加载中">
                <el-table-column type="index" width="60"></el-table-column>
                <el-table-column prop="name" label="姓名" width="120" sortable></el-table-column>
                <el-table-column prop="nickname" label="昵称" width="120" sortable></el-table-column>
                <el-table-column prop="sex" label="性别" width="100" sortable :formatter="formatSex"></el-table-column>
                <el-table-column prop="email" label="邮箱" min-width="160" sortable></el-table-column>
                <el-table-column prop="addr" label="地址" sortable></el-table-column>
            </el-table>
        </el-col>
    </el-row>
</template>

<script>
import API from "../../api/api_user";
import BUS from '../../bus'
export default {
  data() {
    return {
      filters: {
        name: ""
      },
      loading: false,
      users: [],
      total: 0,
      limit: 10,
      page: 1
    };
  },
  methods: {
    bus() {
      BUS.$emit('backIndex', '/dashboard')
    },
    // 性别显示转换
    formatSex(row, column) {
      return row.sex == 1 ? "男" : row.sex == 0 ? "女" : "未知";
    },
    handleSearch() {
      this.total = 0;
      this.page = 1;
      this.search();
    },
    // 获取用户列表
    search() {
      let that = this;
      let params = {
        page: that.page,
        limit: 10,
        name: that.filters.name
      };
      that.loading = true;
      API.findList(params)
        .then(
          function(result) {
            that.loading = false;
            if (result && result.users) {
              that.total = result.total;
              that.users = result.users;
            }
          },
          function(err) {
            that.loading = false;
            that.$message.error({
              showClose: true,
              message: err.toString(),
              duration: 2000
            });
          }
        )
        .catch(function(error) {
          that.loading = false;
          that.$message.error({
            showClose: true,
            message: error.toString(),
            duration: 2000
          });
        });
    }
  },
  mounted() {
    this.handleSearch();
  }
};
</script>

<style lang="scss" scoped>
</style>
