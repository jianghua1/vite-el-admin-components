<template>
  <!-- el-menu-item不含子菜单的情况 -->
  <menu-item :data="data" :collapse="collapse" v-if="!menuHasChildren(data)">
  </menu-item>

  <!-- 左右布局中存在的元素 -->
  <!-- <div class="flex-grow" /> -->

  <!-- el-menu-item含有子菜单的情况 -->
  <el-sub-menu :index="getIndex(data)" v-if="menuHasChildren(data)">
    <template #title v-if="!data.meta?.icon">{{ data.meta?.title }}</template>
    <template #title v-else>
      <Iconify :icon="data.meta?.icon" :style="iconProps.style" :class="iconProps.class"></Iconify>
      <span>{{ data.meta?.title }}</span>
    </template>
    <SubMenu v-for="child in data.children" :data="child" v-bind="subAttrs" :key="`${data.path}/${child.path}`">
    </SubMenu>
  </el-sub-menu>
</template>

<script setup lang='ts'>
import type { SubMenuProps as ElSubMenuProps } from 'element-plus'
import { inject } from 'vue'
import type { AppRouteMenuItem, IconOptions } from './types'
import { useMenu } from './useMenu'

interface SubMenuProps extends Partial<ElSubMenuProps> {
  data: AppRouteMenuItem
  collapse?: boolean
}
const props = defineProps<SubMenuProps>()
const { getIndex, menuHasChildren } = useMenu()

const iconProps = inject('iconProps') as IconOptions

//对入参的解构赋值
const subAttrs = computed(() => {
  const { data, ...restProps } = props
  return restProps
})

</script>
<style scoped></style>