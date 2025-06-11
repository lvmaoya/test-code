<template>
    <page-main>
        <div>
            <!-- 表头：所有内容左对齐 -->
            <div class="flex items-center px-3 py-2 border-b border-gray-200 text-sm text-gray-500">
                <span class="w-5"></span>
                <span class="flex-1 text-left">名称</span>
                <span class="w-24 text-left">类型</span>
                <span class="w-40 text-left">更新时间</span>
            </div>

            <!-- 文件树 -->
            <FileNode v-for="(node, index) in fileTree" :key="index" :node="node"
            @contextmenu="({ event, node }) => showContextMenu(event, node)" :selectedNode="selectedNode"
                @select="handleNodeSelect"/>
        </div>
        <ContextMenu ref="contextMenuRef" :items="menuItems" @close="menuItems = []" />

    </page-main>
</template>

<script setup>
import FileNode from './components/FileNode.vue'
import ContextMenu from './components/ContextMenu.vue'

const fileTree = [
    {
        name: '项目文档',
        type: 'folder',
        updateTime: '2025-06-01 10:00',
        children: [
            { 
                name: '技术方案',
                type: 'folder',
                updateTime: '2025-06-01 11:00',
                children: [
                    { name: '系统架构设计.pdf', type: 'pdf', updateTime: '2025-06-01 12:30' },
                    { name: '数据库设计.docx', type: 'word', updateTime: '2025-06-01 14:20' },
                    { name: '接口文档.md', type: 'markdown', updateTime: '2025-06-02 09:15' }
                ]
            },
            {
                name: '会议记录',
                type: 'folder',
                updateTime: '2025-06-03 15:00',
                children: [
                    { name: '需求评审.docx', type: 'word', updateTime: '2025-06-03 16:00' },
                    { name: '会议纪要.txt', type: 'text', updateTime: '2025-06-04 10:30' }
                ]
            }
        ]
    },
    {
        name: '设计资源',
        type: 'folder',
        updateTime: '2025-06-05 09:00',
        children: [
            { name: 'logo.png', type: 'image', updateTime: '2025-06-05 09:30' },
            { name: '原型图.sketch', type: 'sketch', updateTime: '2025-06-05 11:20' },
            { 
                name: '页面截图',
                type: 'folder',
                updateTime: '2025-06-06 14:00',
                children: [
                    { name: '首页.jpg', type: 'image', updateTime: '2025-06-06 14:30' },
                    { name: '登录页.png', type: 'image', updateTime: '2025-06-06 15:45' }
                ]
            }
        ]
    },
    {
        name: '源代码',
        type: 'folder',
        updateTime: '2025-06-07 10:00',
        children: [
            { name: 'main.js', type: 'javascript', updateTime: '2025-06-07 11:30' },
            { name: 'styles.css', type: 'css', updateTime: '2025-06-07 13:45' },
            { name: 'index.html', type: 'html', updateTime: '2025-06-07 14:20' },
            { 
                name: 'components',
                type: 'folder',
                updateTime: '2025-06-08 09:00',
                children: [
                    { name: 'Header.vue', type: 'vue', updateTime: '2025-06-08 10:15' },
                    { name: 'Footer.vue', type: 'vue', updateTime: '2025-06-08 11:30' }
                ]
            }
        ]
    },
    { name: 'README.md', type: 'markdown', updateTime: '2025-06-09 16:00' },
    { name: 'package.json', type: 'json', updateTime: '2025-06-09 16:30' },
    { name: '.gitignore', type: 'text', updateTime: '2025-06-09 17:00' }
]
const contextMenu = ref({
    visible: false,
    x: 0,
    y: 0,
    node: null
})
const contextMenuRef = ref()
const menuItems = ref([])

const showContextMenu = (e, node) => {
    selectedNode.value = node
    menuItems.value = [
        { label: '刷新', onClick: () => console.log('刷新', node) },
        { label: '打开', onClick: () => console.log('打开', node) },
        { label: '新建文件夹', onClick: () => console.log('新建文件夹', node) },
        { label: '重命名', onClick: () => console.log('重命名', node) },
        // { divider: true },
        {
            label: '删除',
            onClick: () => console.log('删除', node),
            danger: true
        }
    ]
    contextMenuRef.value.show(e.clientX, e.clientY)
}

document.addEventListener('click', () => {
    contextMenu.value.visible = false
})

const selectedNode = ref(null)

const handleNodeSelect = (node) => {
    console.log('handleNodeSelect', node);
    
  selectedNode.value = node
}
</script>