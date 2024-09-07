<template>
  <el-badge :value="value" :max="10000" :style="{
    // '--tomic-notice-bg-color': color || 'var(--el-color-danger)',
    '--tomic-notice-font-size': size + 'px'
  }">
    <slot>
      <Icon icon="ep:bell" class="text-3xl"
        :style="{ color: iconColor ?? '#456123', fontSize: iconSize ? `${iconSize}px` : '18px' }" />
    </slot>

  </el-badge>
</template>

<script setup lang='ts'>
import type { NotificationProps } from './types'
import { Icon } from '@iconify/vue'
//初始化组件参数
const props = withDefaults(defineProps<NotificationProps>(), {
  icon: 'ep:bell',
  size: 18,
  color: ''
})
const colorBg = computed(() => props.color || 'var(--el-color-danger)')
</script>
<style lang="scss" scoped>
$size: var(--tomic-notice-font-size);

//深度选择器
:deep(.el-badge__content) {
  background-color: v-bind(colorBg);
  font-size: $size;
}
</style>