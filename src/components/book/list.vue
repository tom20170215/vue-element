<template>
    <el-row>
        <el-col :span="24">
            <el-breadcrumb separator="/" class="wrap-breadcrumb">
                <el-breadcrumb-item :to="{path:'/'}"><b>首页</b></el-breadcrumb-item>
                <el-breadcrumb-item>图书管理</el-breadcrumb-item>
                <el-breadcrumb-item>图书列表</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>
        <el-col :span="24" v-loading='loading' element-loading-text='拼命加载中' class="wrap-main">
            <!-- 工具条 -->
            <el-col>
                <el-form :inline="true" :model="filters">
                    <el-form-item>
                        <el-input v-model="filters.name" placeholder="书名" @keyup.enter.native="handleSearch"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click.native="handleSearch">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click.native="showAddDialog">新增</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <!-- 列表 -->
            <el-table :data="books" highlight-current-row style="width:100%;">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column type="index" width="69"></el-table-column>
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline>
                            <el-form-item label="[图书简介]">
                                <span>{{props.row.description}}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="书名" sortable></el-table-column>
                <el-table-column prop="author" label="作者" width="100" sortable></el-table-column>
                <el-table-column prop="publishAt" label="出版日期" width="150" sortable></el-table-column>
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button>编辑</el-button>
                        <el-button type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 工具条 -->
            <el-col :span="24" style="margin-top:50px;">
                <el-button type="danger">批量删除</el-button>
                <el-pagination layout="prev, pager, next" :page-size="10" :total="total" background style="float:right;"></el-pagination>
            </el-col>
        </el-col>
    </el-row>
</template>

<script>
import API from '../../api/api_book.js'
    export default {
        data() {
            return {
                loading: false,
                filters: {
                    name: ''
                },
                books: [],
                total: 0,
                page: 1
            }
        },
        methods: {
            handleSearch() {
                this.total = 0;
                this.page = 1;
                this.search();
            },
            search() {
                let that = this;
                let params = {
                    page: that.page,
                    limit: 10,
                    name: that.filters.name
                };
                that.loading = true;
                API.findList(params).then(function (result) {
                    that.loading = false;
                    if (result && result.books) {
                        that.total = result.total;
                        that.books = result.books;
                    }
                },function (err) {
                    that.loading = false;
                    that.$message.error({showClose: true, message: err.toString(), duration: 2000});
                }).catch(function (error) {
                    that.loading = false;
                    that.$message.error({showClose: true, message: err.toString(), duration: 2000});
                });
            },
            showAddDialog() {

            }
        },
        mounted() {
            this.handleSearch()
        }
    }
</script>

<style lang="scss" scoped>
</style>

