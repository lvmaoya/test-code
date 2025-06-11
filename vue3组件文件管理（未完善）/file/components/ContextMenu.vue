<template>
    <!-- 遮罩层：透明，但覆盖所有区域 -->
    <div
      v-if="visible"
      class="fixed inset-0 z-40"
      @mousedown.prevent.stop="hide"
    ></div>
  
    <!-- 右键菜单本体 -->
    <div
      v-if="visible"
      ref="menuRef"
      class="fixed z-50 w-56 rounded-xl shadow-2xl border border-neutral-200 bg-white select-none text-sm overflow-hidden"
      :style="{ top: `${position.y}px`, left: `${position.x}px` }"
    >
      <template v-for="(item, index) in items" :key="index">
        <div
          v-if="!item.divider"
          class="px-4 py-2 text-[14px] cursor-pointer transition-colors"
          :class="[
            item.active
              ? 'bg-blue-500 text-white'
              : item.danger
                ? 'text-red-600 hover:bg-red-100'
                : 'text-gray-800 hover:bg-gray-100'
          ]"
          @click.stop="handleClick(item)"
        >
          {{ item.label }}
        </div>
  
        <div
          v-else
          class="h-px bg-neutral-300"
        ></div>
      </template>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const props = defineProps({
    items: {
      type: Array,
      required: true
    }
  })
  const emit = defineEmits(['close'])
  
  const visible = ref(false)
  const position = ref({ x: 0, y: 0 })
  const menuRef = ref(null)
  
  const show = (x, y) => {
    position.value = { x, y }
    visible.value = true
  }
  
  const hide = () => {
    visible.value = false
    emit('close')
  }
  
  const handleClick = (item) => {
    item?.onClick?.()
    hide()
  }
  
  defineExpose({ show, hide })
  </script>
  