<template>
    <div>
        <!-- 单个文件/文件夹行 -->
        <div class="flex items-center px-3 py-2.5 rounded-md cursor-pointer" @click="onClick" @dblclick="useGoDetail('fileDetail',{id: index})" :class="{ 'isSelected': isSelected }" @contextmenu.prevent="onRightClick">
            <!-- 箭头 -->
            <span class="w-5 flex justify-center text-gray-400">
                <template v-if="isFolder">
                    <svg class="w-4 h-4 transform" :class="{ 'rotate-90': expanded }" fill="none" stroke="currentColor"
                        stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </template>
            </span>

            <!-- 图标：有颜色 -->
            <span class="w-5 flex justify-center" :class="iconColor">
                <svg v-if="node.type === 'folder'" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 4a2 2 0 012-2h4l2 2h6a2 2 0 012 2v1H2V4zM2 8h16v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8z" />
                </svg>
                <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V7.5a1 1 0 00-.293-.707l-4.5-4.5A1 1 0 0013.5 2H4z" />
                </svg>
            </span>

            <!-- 名称 / 类型 / 时间 -->
            <span class="flex-1 ml-2 text-sm text-[#333] text-left">{{ node.name }}</span>
            <span class="w-24 text-sm text-[#999] text-left">{{ node.type }}</span>
            <span class="w-40 text-sm text-[#999] text-left">{{ node.updateTime }}</span>
        </div>

        <!-- 子节点：缩进 -->
        <div v-if="isFolder && expanded" class="ml-6">
            <FileNode v-for="(child, index) in node.children" :key="index" :node="child" :selectedNode="selectedNode"
            @select="$emit('select', $event)" @contextmenu="$emit('contextmenu', $event)" @dblclick="useGoDetail('fileDetail',{id: index})"/>
        </div>
    </div>
</template>

<script setup>
import { computed, defineProps, ref } from 'vue'
import { useGoDetail } from '@/composables/godetail'

const props = defineProps({
    node: Object,
    selectedNode: Object // 传入选中的节点
})
const emit = defineEmits(['select', 'contextmenu'])

const onRightClick = (e) => {
    emit('contextmenu', { event: e, node: props.node })
}
const expanded = ref(false)
const isFolder = props.node?.type === 'folder'
const isSelected = computed(() => props.selectedNode?.name === props.node.name)
const onClick = () => {
    emit('select', props.node)
    if (isFolder) {
        expanded.value = !expanded.value
    }
}
const toggle = () => {
    if (isFolder) {
        expanded.value = !expanded.value
    }
}

// 图标颜色映射
const iconColor = computed(() => {
    switch (props.node.type) {
        case 'folder':
            return 'text-yellow-500'
        case 'pdf':
            return 'text-red-500'
        case 'image':
            return 'text-blue-500'
        case 'text':
            return 'text-gray-500'
        default:
            return 'text-gray-400'
    }
})
</script>

<style lang="scss" scoped>
.isSelected::after{
    content: '';
    position: absolute;
    left: 20px;
    right: 20px;
    height: 32px;
    border-radius: 6px;
    background-color: rgba(0, 0, 0, 0.1)
}
</style>