<template>
    <el-row>
        <el-col :span="24">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{path: '/'}" @click.native="bus"><b>首页</b></el-breadcrumb-item>
                <el-breadcrumb-item>图书管理</el-breadcrumb-item>
                <el-breadcrumb-item>图书分类</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>
        <el-col :span="8">
            <div>
                <span style="display:inline-block;margin:10px auto 10px;color:#818080;font-size:18px;">DatePicker日期选择器</span>
                <el-date-picker type="daterange" start-placeholder='开始日期' end-placeholder="结束日期" v-model="value1" :unlink-panels='true' range-separator="至"></el-date-picker>
            </div>
        </el-col>
        <el-col :span="8">
            <input-custom :value="price" @input="onInput"></input-custom>
            <p>{{price}}</p>
        </el-col>
    </el-row>
</template>

<script>
    import BUS from '../../bus.js'
    import inputCustom from '../custom.vue'
    export default {
        data() {
            return {
                value1: '',
                price: ''
            }
        },
        components: {
            inputCustom: inputCustom
        },
        methods: {
            bus() {
                BUS.$emit('backIndex', '/dashboard')
            },
            onInput(value) {
                this.price = value;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>

