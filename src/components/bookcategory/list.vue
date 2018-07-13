<template>
    <el-row>
        <el-col :span="24">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{path: '/'}"><b>首页</b></el-breadcrumb-item>
                <el-breadcrumb-item>图书管理</el-breadcrumb-item>
                <el-breadcrumb-item>图书分类</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>
        <el-col :span="24">
            <h2>Nothing</h2>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>

</style>

