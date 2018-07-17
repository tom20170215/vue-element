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
                        <el-button @click="showEditDialog(scope.$index,scope.row)">编辑</el-button>
                        <el-button type="danger" @click.native="delBook(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 底部工具条 -->
            <el-col :span="24" style="margin-top:50px;">
                <el-button type="danger" :disabled="this.sels.length === 0" @click.native="deleteBook">批量删除</el-button>
                <el-pagination layout="prev, pager, next" :page-size="10" :total="total" background style="float:right;" @current-change="handleCurrentChange"></el-pagination>
            </el-col>
            <!-- 新增界面 -->
            <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
                <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm"> 
                    <el-form-item label="书名" prop="name">
                        <el-input v-model="addForm.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="作者" prop="author">
                        <el-input v-model="addForm.author" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="出版日期">
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
            <!-- 编辑界面 -->
            <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
                <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                    <el-form-item label="书名" prop="name">
                        <el-input v-model="editForm.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="作者" prop="author">
                        <el-input v-model="editForm.author" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="出版日期">
                        <el-date-picker type="date" placeholder="选择日期" v-model="editForm.publishAt"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="简介" prop="description">
                        <el-input type="textarea" :rows="8" v-model="editForm.description"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click.native="editFormVisible = false">取消</el-button>
                    <el-button type="primary" @click.native="editSubmit">提交</el-button>
                </div>
            </el-dialog>
        </el-col>
    </el-row>
</template>

<script>
import API from '../../api/api_book.js'
import util from '../../common/utils.js'
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
                addFormVisible: false,
                editFormVisible: false,
                addForm: {
                    name: '',
                    author: '',
                    publishAt: '',
                    description: ''
                },
                editForm: {
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
                    description: [
                        {required: true, message: '请输入简介', trigger: 'blur'}
                    ]
                },
                editFormRules: {
                    name: [
                        {required: true, message: '请输入书名', trigger: 'blur'}
                    ],
                    author: [
                        {required: true, message: '请输入作者', trigger: 'blur'}
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
                this.addFormVisible = true;
                this.addForm = {
                    name: '',
                    author: '',
                    publishAt: '',
                    description: ''
                }
            },
            showEditDialog(index,row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({},row);
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
                let that = this;
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        that.loading = true;
                        let para = Object.assign({},that.addForm);
                        para.publishAt = (!para.publishAt || para.publishAt == '') ? '' : util.formatDate.format(new Date(para.publishAt),'yyyy-MM-dd');
                        API.add(para).then(function (result) {
                            that.loading = false;
                            if (result && parseInt(result.errcode) === 0) {
                                that.$message.success({showClose: true, message: '新增成功', duration: 2000});
                                that.$refs.addForm.resetFields();
                                that.addFormVisible = false;
                                that.search();
                            }else{
                                that.$message.error({showClose: true, message: '新增失败',duration: 2000});
                            }
                        }, function (err) {
                            that.loading = false;
                            that.$message.error({showClose: true, message: err.toString(), duration: 2000});
                        }).catch(function () {
                            that.loading = false;
                            that.$message.error({showClose:true, message: '请求出现异常', duration: 2000})
                        })
                    }
                });
            },
            // 编辑图书
            editSubmit() {
                let that = this;
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        that.loading = true;
                        let para = Object.assign({},that.editForm);
                        para.publishAt = (!para.publishAt || para.publishAt == '') ? '' : util.formatDate.format(new Date(para.publishAt),'yyyy-MM-dd');
                        API.update(para.id, para).then(function (result) {
                            that.loading = false;
                            if (result && parseInt(result.errcode) == 0) {
                                that.$message.success({showClose: true, message: '修改成功', duration: 2000});
                                that.$refs['editForm'].resetFields();
                                that.editFormVisible = false;
                                that.search();
                            }else{
                                that.$message.error({showClose: true, message: '修改失败', duration: 2000})
                            }
                        },function (err) {
                            that.loading = false;
                            that.$message.error({showClose: true, message: err.toString(), duration: 2000});
                        }).catch(function (error) {
                            that.loading = false;
                            that.$message.error({showClose: true, message: '请求异常', duration: 2000});
                        });
                    }
                })
            },
            // 删除图书
            delBook(index,row) {
                let that = this;
                this.$confirm('确认删除该记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    that.loading = true;
                    API.remove(row.id).then((result) => {
                        that.loading = false;
                        if (result && result.errcode === 0) {
                            that.$message.success({showClose: true, message: '删除成功', duration: 2000});
                            that.search();
                        }else{
                            that.$message.error({showClose: true, message: '删除失败', duration: 2000})
                        }
                    }, error => {
                        that.loading = false;
                        that.$message.error({showClose: true, message: error.toString(), duration: 2000});
                    }).catch(err => {
                        that.loading = false;
                        that.$message.error({showClose: true, message: '请求出现异常', duration: 2000})
                    })
                })
            }
        },
        mounted() {
            this.handleSearch()
        }
    }
</script>

<style lang="scss" >
    .el-form-item__label{
        font-weight: bold;
    }
</style>

