<template>
  <el-dropdown trigger="click" @command="handleCommand">
    <slot name="header">

    </slot>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="(item, index) in items" :key="index" :command="{ item, index }"
          :class="{ active: index === currentIndex }">
          <div class="flex items-center">
            <Iconify v-if="item.icon" :icon="item.icon" v-bind="iconProps" class="mr-2" :class="iconClass">
            </Iconify>
            <slot :item="item" name="item"></slot>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang='ts' generic="T extends {icon?: string}">
import type { IconProps } from '@iconify/vue';


interface dropdownProps extends Partial<IconProps> {
  items: T[]
  iconProps?: Partial<IconProps>
  iconClass?: string
}

const props = defineProps<dropdownProps>()

const currentIndex = defineModel('modelValue', {
  default: 0
})

const emits = defineEmits<{
  change: [item: T, index?: number]
}>()


const handleCommand = (command: { item: T; index: number }) => {
  currentIndex.value = command.index
  emits('change', command.item, command.index)
}

</script>
<style scoped lang="scss">
:deep(.el-dropdown-menu__item) {
  &.active {
    background-color: var(--el-dropdown-menuItem-hover-fill);
    color: var(--el-dropdown-menuItem-hover-color);
  }
}
</style>