<template>
  <div>
    <!-- button -->
    <el-button type="primary" @click="() => toggle(true)">
      <slot>选择图标</slot>
    </el-button>
    <!-- dialog -->
    <el-dialog :title="title" :width="width" v-model="show">
      <!-- icon-list -->
      <IconList @click="handleClick1" :show-text="showTextFlag" active-class="text-[#409EFF]"
        item-class="'hover:bg-sky-200" icon-class="text-2xl"></IconList>
      <!-- setting 颜色和大小 -->
      <div class="p-2 flex">
        <div class="mr-4">
          <span>color：</span>
          <el-color-picker v-model="color1" class="mr-2" />
        </div>
        <div class="flex items-center flex-1">
          <span class="pr-2">fontSize：</span>
          <el-slider v-model="num" :step="1" show-input />
        </div>
      </div>
      <div>
        选中的图标：
        <Icon :icon="iconRef" :style="{ color: color1, fontSize: `${num}px` }" />
      </div>
      <!-- button -->
      <template #footer>
        <el-button @click="() => toggle(false)">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang='ts'>
import { Icon } from '@iconify/vue';
import type { IconPickerSubmitDataType } from './types';

defineProps({
  width: {
    type: String,
    default: '50%'
  },
  title: {
    type: String,
    default: '图标选择器'
  }
})

const showTextFlag = ref(false)
// 取色器默认颜色
const color1 = ref('#409EFF')
const num = ref(16)

const [show, toggle] = useToggle(false)

const iconRef = ref('')
const iconPrefix = ref('ep')
const handleClick1 = (iconName: string) => {
  iconRef.value = iconPrefix.value + ":" + iconName
}

const emits = defineEmits<{
  'submit': [IconPickerSubmitDataType], 'cancel': []
}>()

// 确定并关闭模态框，将icon 颜色 大小传给IconPicker
const handleConfirm = () => {
  toggle(false)
  emits('submit', { icon: iconRef.value, color: color1.value, fontSize: num.value })
}

</script>
<style scoped lang="scss">
:deep(.el-dialog_body) {
  padding-top: 0;
  padding-bottom: 0;
  max-height: 65vh;
  overflow-y: auto;
  height: auto;
}
</style>