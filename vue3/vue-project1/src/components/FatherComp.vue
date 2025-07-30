<script setup>
import { ref } from "vue";
import ChildComp from "./ChildComp.vue";
const count = ref(0)
</script>

<template>
  <div class="father">
    父组件 {{count}}
    <ChildComp v-model:count="count" />
  </div>
</template>

<style scoped>
.father {
  color: blue;
}
</style>
