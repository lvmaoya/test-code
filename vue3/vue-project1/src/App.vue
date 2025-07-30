<!-- Counter.vue -->
<template>
  <div class="box">
    <h2>{{ title }}</h2>
    <p>当前计数：{{ count }}</p>
    <button @click="count++">增加</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('计数器')
const count = ref(0)
</script>