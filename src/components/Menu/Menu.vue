<template>
  <el-menu ref="menuRef" v-bind="menuProps" :style="{ '--bg-color': backgroundColor }" class="border-r-0!"
    @select="handleSelect" @open="handleOpen" @close="handleClose" :default-active="getDefaultActive($route)">
    <slot name="icon"></slot>
    <div class="flex-grow" v-if="isDefined(slots['icon'])" />
    <sub-menu v-for="menu in fileredMenus" :key="menu.path" :data="menu" :collapse="collapse" v-bind="subMenuProps">
    </sub-menu>
  </el-menu>
</template>
<script setup lang='ts'>
import type { MenuProps as ElMenuProps, SubMenuProps } from 'element-plus'
import type { AppRouteMenuItem, EmitSelectType, IconOptions, OpenCloseType } from './types'
import type { NavigationFailure } from 'vue-router';

import { useMenu } from './useMenu'
import { isDefined } from '@vueuse/core'
import { provide } from 'vue';

interface MenuProps extends Partial<ElMenuProps> {
  data: AppRouteMenuItem[]
  subMenuProps?: Partial<SubMenuProps>
  iconProps?: Partial<IconOptions>
}
const props = withDefaults(defineProps<MenuProps>(), {
  data: () => [],
  iconProps: () => ({
    style: { fontSize: '22px' },
    class: 'mr-3'
  }),
  backgroundColor: 'transparent',
  ellipsis: true
})
//当折叠时，iconProps中的样式要发生改变
const iconProps = reactive(props.iconProps)
const menuRef = ref()

watch(
  () => props.collapse,
  () => {
    iconProps.class = props.collapse ? '' : 'mr-3'
  }
)

//初始化根组件的iconProps（icon的样式）
provide('iconProps', props.iconProps)

const slots = useSlots()

const { generateMenuKeys, getItem, getParentMenu } = useMenu()

const fileredMenus = computed(() => {
  return generateMenuKeys(props.data)
})

const menuProps = computed(() => {
  const { subMenuProps, data, ...restProps } = props
  return restProps
})

onMounted(() => {
  //获取父亲的菜单数据模型
  const item = getParentMenu(fileredMenus.value)
  if (item && item.meta && item.meta.key) {
    if (menuRef.value && menuRef.value.open) {
      !props.collapse && menuRef.value.open(item.meta.key)
    }
  }
})

const emits = defineEmits<{
  select: [item: AppRouteMenuItem],
  open: OpenCloseType,
  close: OpenCloseType
}>()

const handleOpen = (...args: OpenCloseType) => {
  emits('open', ...args)
}

const handleClose = (...args: OpenCloseType) => {
  emits('close', ...args)
}

const handleSelect = (...args: EmitSelectType) => {
  const [index] = args
  const item = getItem(fileredMenus.value, index)
  if (!item) return
  emits('select', item)
}

const getDefaultActive = (route: AppRouteMenuItem) => {
  let key = ''

  const findKey = (menus: AppRouteMenuItem[]) => {
    menus.forEach((item) => {
      if (item.name == route.name) key = item.meta?.key as string
      if (item.children) findKey(item.children)
    })
  }
  findKey(fileredMenus.value)
  return key
}

</script>
<style lang="scss" scoped>
:deep(.el-sub-menu__title) {
  padding-right: 0 !important;
}
</style>