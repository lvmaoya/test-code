<template>
    <page-main class="!p-0" @click="selectedItem=null">
        <div class="flex justify-between items-center p-5 border-b border-[#eee]">
            <div class="flex gap-2">
                <el-button :icon="ArrowLeft" size="small" class="!ml-0 !px-1" />
                <el-button :icon="ArrowRight" size="small" class="!ml-0 !px-1" />
                <el-breadcrumb :separator-icon="ArrowRight" class="ml-2">
                    <el-breadcrumb-item v-for="(crumb, index) in breadcrumbs" :key="index"
                        @click="goToBreadcrumb(index)">
                        <a class="text-base">{{ crumb.name }}</a>
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>

            <div class="flex items-center space-x-2">
                <el-input v-model="searchQuery" placeholder="搜索文件或目录" class="!w-60">
                    <template #prefix>
                        <el-icon size="small">
                            <search />
                        </el-icon>
                    </template>
                </el-input>
                <el-button @click="openCreateDialog" type="primary" plain>新建目录</el-button>
                <el-button @click="openUploadDialog" icon="upload" type="warning" plain>上传文件</el-button>
            </div>
        </div>

        <div v-if="filteredItems.length === 0" class="text-gray-400 text-center py-30">
            暂无文件
        </div>

        <div v-else class="flex flex-wrap gap-1 p-5">
            <div v-for="item in filteredItems" :key="item.id" @click.stop="selectItem(item)" @dblclick="openItem(item)"
                :class="[
                    'cursor-pointer p-2 rounded-lg text-center w-[6.25rem] box-border',
                    selectedItem?.id === item.id ? ' bg-[#e6e6e6]' : ''
                ]">
                <div class="mb-1">
                    <img :src="getIcon(item)" class="w-10 h-10 mx-auto" alt="icon" />
                </div>
                <span class="truncate text-xs text-[#555]">{{ item.name }}</span>
            </div>
        </div>

        <!-- 新建目录弹窗 -->
        <el-dialog v-model="createDialogVisible" title="新建目录">
            <el-input v-model="newFolderName" placeholder="请输入目录名称" />
            <template #footer>
                <el-button @click="createDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="createFolder">确定</el-button>
            </template>
        </el-dialog>

        <!-- 上传文件弹窗 -->
        <el-dialog v-model="uploadDialogVisible" title="上传文件">
            <el-upload drag action="#" :before-upload="handleUpload">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text h-60 leading-60">拖拽文件到此处或点击上传</div>
            </el-upload>
        </el-dialog>
    </page-main>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useGoDetail } from '@/composables/godetail'
import { ElMessage } from 'element-plus';
import {
    ArrowLeft,
    ArrowRight,
} from '@element-plus/icons-vue';
const currentPath = ref([{ name: '根目录', id: null }]);

const items = ref([
    { id: 1, name: '文档.txt', type: 'file' },
    { id: 2, name: '图片.jpg', type: 'file' },
    { id: 3, name: '项目文件夹', type: 'folder' },
    { id: 4, name: '报表.xlsx', type: 'file' },
    { id: 5, name: '代码.zip', type: 'file' },
    { id: 6, name: '素材文件夹', type: 'folder' }
]);

const breadcrumbs = computed(() => currentPath.value);
const selectedItem = ref(null);
const searchQuery = ref('');
const createDialogVisible = ref(false);
const uploadDialogVisible = ref(false);
const newFolderName = ref('');

const filteredItems = computed(() => {
    return items.value.filter(i => i.name.includes(searchQuery.value));
});

function selectItem(item) {
    selectedItem.value = item;
}

function openItem(item) {
    if (item.type === 'folder') {
        currentPath.value.push({ name: item.name, id: item.id });
        fetchFolderContent(item.id);
    } else {
        useGoDetail('fileDetail', { id: item.id });
    }
}

function goToBreadcrumb(index) {
    const target = currentPath.value[index];
    currentPath.value = currentPath.value.slice(0, index + 1);
    fetchFolderContent(target.id);
}

function openCreateDialog() {
    newFolderName.value = '';
    createDialogVisible.value = true;
}

function createFolder() {
    if (!newFolderName.value.trim()) return;
    items.value.push({ id: Date.now(), name: newFolderName.value, type: 'folder' });
    createDialogVisible.value = false;
    ElMessage.success('目录创建成功');
}

function openUploadDialog() {
    uploadDialogVisible.value = true;
}

function handleUpload(file) {
    items.value.push({ id: Date.now(), name: file.name, type: 'file' });
    uploadDialogVisible.value = false;
    ElMessage.success('上传成功');
    return false;
}

function fetchFolderContent(folderId) {
    // 模拟接口获取文件夹内容
    setTimeout(() => {
        if (folderId === 3) {
            items.value = [
                { id: 100, name: '设计稿.zip', type: 'file' },
                { id: 101, name: '备份', type: 'folder' }
            ];
        } else if (folderId === 6) {
            items.value = [];
        } else {
            items.value = [
                { id: 1, name: '文档.txt', type: 'file' },
                { id: 2, name: '图片.jpg', type: 'file' },
                { id: 3, name: '项目文件夹', type: 'folder' },
                { id: 4, name: '报表.xlsx', type: 'file' },
                { id: 5, name: '代码.zip', type: 'file' },
                { id: 6, name: '素材文件夹', type: 'folder' }
            ];
        }
    }, 300);
}

function getIcon(item) {
    if (item.type === 'folder') return new URL('./icons/folder.svg', import.meta.url).href;
    const ext = item.name.split('.').pop().toLowerCase();
    if (['txt', 'md'].includes(ext)) return new URL('./icons/txt.svg', import.meta.url).href;
    if (['jpg', 'png', 'gif'].includes(ext)) return new URL('./icons/pic.svg', import.meta.url).href;
    if (['zip', 'rar'].includes(ext)) return new URL('./icons/zip.svg', import.meta.url).href;
    if (['xlsx', 'xls'].includes(ext)) return new URL('./icons/xls.svg', import.meta.url).href;
    return new URL('/icons/file.svg', import.meta.url).href;
}
</script>

<style scoped>
.el-icon {
    font-size: 2rem;
}
</style>