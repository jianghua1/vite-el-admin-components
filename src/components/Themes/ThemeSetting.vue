<template>
  <Iconify icon="ri:brush-2-line" class="text-xl mr-2 cursor-pointer" @click="drawer = true"></Iconify>
  <el-drawer v-model="drawer" title="主题设置" class="min-w-[330px] lt-sm:w-full!" @close="handlerClose">
    <el-form :model="form">
      <!-- 主题颜色 -->
      <el-form-item label="主题颜色">
        <el-color-picker v-model="form.theme"></el-color-picker>
      </el-form-item>
      <!-- 暗黑模式 -->
      <el-form-item label="暗黑模式">
        <el-switch v-model="form.darkMode" />
      </el-form-item>
      <!-- 导航模式-->
      <el-form-item label="导航模式" class="flex-col nav">
        <div class="flex justify-around flex-1">
          <el-tooltip content="左侧菜单">
            <div class="item" @click="() => (form.mode = 'siderbar')">
              <div class="bg-dark w-1/4 h-full left-0 top-0 absolute"></div>
              <div class="w-3/4 h-full right-0 top-0 absolute">
                <div class="bg-gray-100 w-full h-1/4"></div>
                <div class="bg-gray w-full h-3/4"></div>
              </div>
            </div>
          </el-tooltip>
          <el-tooltip content="顶部左侧菜单混合">
            <div class="item" @click="() => (form.mode = 'mix')">
              <!-- 上 -->
              <div class="bg-dark w-full h-1/4 left-0 top-0 absolute"></div>
              <!-- 下 -->
              <div class="w-full h-3/4 left-0 bottom-0 absolute">
                <!-- 左 -->
                <div class="bg-gray-100 w-1/4 h-full float-left"></div>
                <!-- 右 -->
                <div class="bg-gray w-3/4 h-full float-left"></div>
              </div>
            </div>
          </el-tooltip>
          <el-tooltip content="顶部菜单">
            <div class="item" @click="() => (form.mode = 'top')">
              <!-- 上 -->
              <div class="bg-dark w-full h-1/4 left-0 top-0 absolute"></div>
              <!-- 下 -->
              <div class="bg-gray w-full h-3/4 left-0 bottom-0 absolute"></div>
            </div>
          </el-tooltip>
          <el-tooltip content="左侧菜单混合">
            <div class="item" @click="() => (form.mode = 'mixbar')"></div>
          </el-tooltip>
        </div>
      </el-form-item>
      <!-- 菜单背景 -->
      <el-form-item label="菜单背景">
        <el-color-picker v-model="form.backgroundColor"></el-color-picker>
      </el-form-item>
      <!-- 菜单宽度 -->
      <el-form-item label="菜单宽度">
        <el-slider v-model="form.menuWidth" class="ml-3" :max="600" :min="280" show-input input-size="small" />
      </el-form-item>
      <!-- 显示Logo -->
      <el-form-item label="显示Logo">
        <el-switch v-model="form.showLogo" />
      </el-form-item>
      <!-- 切换动画 -->
      <el-form-item label="切换动画">
        <el-select v-model="form.transition" placeholder="请选择">
          <el-option v-for="item in TRANSITION_NAMES" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 标签页 -->
      <el-form-item label="标签页">
        <el-switch v-model="form.showTabs" />
      </el-form-item>
      <!-- 头部固定 -->
      <el-form-item label="头部固定">
        <el-switch v-model="form.fixedHead" />
      </el-form-item>
      <!-- 面包屑 -->
      <el-form-item label="显示 面包屑导航">
        <el-switch v-model="form.showBreadcrumb" />
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup lang='ts'>
import Iconify from '../Icon/Iconify.vue'
import type { ThemeSettingsProps } from './types'
import { TransitionNameEnum, TRANSITION_NAMES } from './const'

const drawer = ref(false)

//初始化数据
const props = withDefaults(defineProps<ThemeSettingsProps>(), {
  theme: '#409eff',
  darkMode: false,
  menuWidth: 280,
  showLogo: false,
  showTabs: true,
  fixedHead: false,
  showBreadcrumb: false,
  mode: 'siderbar',
  backgroundColor: '#001529',
  transition: TransitionNameEnum.Fade
})

const emits = defineEmits<{
  change: [settings: ThemeSettingsProps]
}>()
//将入参转换为响应式数据,供页面使用
const form = reactive<ThemeSettingsProps>({
  ...props
})

//当响应式数据form初始化时就传递给父组件
onMounted(() => {
  emits('change', form)
})
//当关闭主题设置组件时,将change事件传递父组件,同时将响应式对象form上传给父组件
const handlerClose = () => {
  emits('change', form)
}
</script>
<style lang="scss" scoped>
:deep(.el-form-item__content) {
  justify-content: flex-end
}

:deep(.nav .el-form-item__label) {
  justify-content: flex-start
}

.item {
  @apply bg-gray-100 rounded w-15 h-12 relative overflow-hidden shadow border border-gray-200 cursor-pointer;

  &.active {
    @apply border-blue-900 border-2;
  }
}

// :deep(.el-drawer) {
//   min-width: 330px;
// }</style>