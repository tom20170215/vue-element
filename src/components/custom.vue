<template>
    <input type="text" :value="value" @input="updateVal($event.target.value)">
</template>

<script>
    export default {
        props:['value'],
        methods: {
            updateVal(val) {
                this.$emit('input', val);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>

