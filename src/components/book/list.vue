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
            <el-table :data="books" highlight-current-row style="width:100%;" @selection-change="selschange">
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
            <!-- 底部工具条 -->
            <el-col :span="24" style="margin-top:50px;">
                <el-button type="danger" :disabled="this.sels.length === 0" @click.native="deleteBook">批量删除</el-button>
                <el-pagination layout="prev, pager, next" :page-size="10" :total="total" background style="float:right;" @current-change="handleCurrentChange"></el-pagination>
            </el-col>
            <!-- 新增界面 -->
            <el-dialog title="新增" :visible.sync='addFormVisible' :close-on-click-modal='false'>
                <el-form :modal="addForm" label-width="80px" :rules="addFormRules" ref="addForm"> 
                    <el-form-item label="书名" prop="name">
                        <el-input v-model="addForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="作者" prop="author">
                        <el-input v-model="addForm.author"></el-input>
                    </el-form-item>
                    <el-form-item label="出版日期" prop="publishAt">
                        <el-date-picker type="date" placeholder="选择日期" v-model="addForm.publishAt"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="简介" prop="description">
                        <el-input type="textarea" :rows="8" v-model="addForm.description"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click.native="addFormVisible = false">取消</el-button>
                    <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
                </div>
            </el-dialog>
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
                    name: '' // 查询的书名
                },
                books: [], // 图书列表
                total: 0,  
                page: 1,
                sels: [], // 被选中的图书数组
                addLoading: false,
                addFormVisible: true,
                addForm: {
                    name: '',
                    author: '',
                    publishAt: '',
                    description: ''
                },
                addFormRules: {
                    name: [
                        {required: true, message: '请输入书名', trigger: 'blur'}
                    ],
                    author: [
                        {required: true, message: '请输入作者', trigger: 'blur'}
                    ],
                    publishAt: [
                        {required: true, message: '请输入日期', trigger: 'change'}
                    ],
                    description: [
                        {required: true, message: '请输入简介', trigger: 'blur'}
                    ]
                }
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

            },
            handleCurrentChange(val) {
                this.page = val;
                this.search();
            },
            selschange(val) {
                this.sels = val
            },
            // 批量删除
            deleteBook() {
                let ids = this.sels.map(item => item.id).toString();
                let that = this;
                this.$confirm('确认删除选中记录吗？','提示',{
                    type: 'warning'
                }).then((() => {
                    that.loading = true;
                    API.removeBatch(ids).then(function (result) {
                        that.loading = false;
                        if (result && parseInt(result.errcode) === 0) {
                            that.$message.success({showClose: true, message: '删除成功', duration: 1500});
                            that.search();
                        }
                    }, function (err) {
                        that.loading = false;
                        that.$message.error({showClose: true, message: err.toString(), duration: 1500});
                    }).catch(function (error) {
                        that.loading = false;
                        that.$message.error({showClose: true, message: '请求出现异常', duration: 1500});
                    });
                }))
            },
            // 新增图书
            addSubmit() {

            }
        },
        mounted() {
            this.handleSearch()
        }
    }
</script>

<style lang="scss" scoped>
</style>

