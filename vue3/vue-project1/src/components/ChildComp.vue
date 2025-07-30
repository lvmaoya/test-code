<script setup>
const count = defineModel('count', { default: 1 })
</script>

<template>
<div class="child">
    子组件
    {{count}}
    <button @click="count++">子组件按钮</button>
    <!-- <input type="text" v-model="count"> -->
</div>
</template>

<style scoped>
.child{
    color: red;
}
</style>