<template>
  <!-- 没有ICON显示 -->
  <el-menu-item :index="getIndex(data)" :disabled="data.meta?.disabled" v-if="!data.meta?.icon">
    {{ data.meta?.title }}
  </el-menu-item>
  <!-- 有ICON显示 -->
  <template v-else>
    <!-- 折叠 -->
    <el-menu-item :index="getIndex(data)" :disabled="data.meta?.disabled" v-if="collapse">
      <Iconify :icon="data.meta?.icon" :style="iconProps.style" :class="iconProps.class"></Iconify>
      <template #title>
        {{ data.meta?.title }}
      </template>
    </el-menu-item>
    <!-- 侧栏 -->
    <el-menu-item :index="getIndex(data)" :disabled="data.meta?.disabled">
      <Iconify :icon="data.meta?.icon" :style="iconProps.style" :class="iconProps.class"></Iconify>
      <span>{{ data.meta?.title }}</span>
    </el-menu-item>
  </template>
</template>

<script setup lang='ts'>
import { inject } from 'vue';
import type { AppRouteMenuItem, IconOptions } from './types';
import { useMenu } from './useMenu'

interface MenuItemProps {
  data: AppRouteMenuItem
  //折叠开关
  collapse?: boolean
}

defineProps<MenuItemProps>()

const iconProps = inject('iconProps') as IconOptions

const { getIndex } = useMenu()
</script>
<style scoped></style>