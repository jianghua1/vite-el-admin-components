<template>
  <div class="flex justify-between items-center px-2">
    <el-tabs type="card" class="myTabs overflow-hidden flex-1" closable v-on="forwardEvents" v-model="modelValue">
      <el-tab-pane :name="item?.name as string" v-for="item in data" :key="item.name as string"
        :label="item.meta && item.meta?.title"></el-tab-pane>
    </el-tabs>
    <DropDown :items="items" class="w-6" @change="handleClick">
      <template #header>
        <Iconify icon="mdi:view-grid" size="18px"></Iconify>
      </template>
      <template #item="{ item }">
        {{ item.text }}
      </template>
    </DropDown>
  </div>
</template>

<script setup lang='ts'>
import type { TabsProps, TabsPaneContext } from 'element-plus'
import type { AppRouteMenuItem } from '../Menu/types'
import { forwardEventsUtils } from '../../utils/format'
import { TabActions } from './types.d.ts'

interface HeaderTabsProps extends Partial<TabsProps> {
  data: AppRouteMenuItem[]
}

type TabPaneName = string | number

type HeaderTabsEvents = {
  tabClick: [pane: TabsPaneContext, ev: Event]
  tabChange: [pane: TabPaneName]
  edit: [pane: TabPaneName | undefined, action: 'add' | 'remove']
  tabRemove: [pane: TabPaneName]
  tabAdd: []
  tabMenuClick: [action: TabActions]
}
const eventsName = ['tabClick', 'tabChange', 'edit', 'tabRemove', 'tabAdd']

withDefaults(defineProps<HeaderTabsProps>(), {
  //标签宽度是否自动撑开
  stretch: false,
  //标签是否可关闭
  closable: false,
  //标签是否可增加
  addable: false,
  //标签是否可增加和编辑
  editable: false,
  //选项卡所在位置
  tabPosition: 'top'
})

const emits = defineEmits<HeaderTabsEvents>()

const forwardEvents = forwardEventsUtils(emits, eventsName)

const modelValue = defineModel()

const items = ref([
  {
    action: TabActions.closeOthers,
    icon: 'ep:close',
    text: '关闭其他'
  },
  {
    action: TabActions.closeLeft,
    icon: 'line-md:arrow-close-left',
    text: '关闭左侧'
  }, {
    action: TabActions.closeRight,
    icon: 'line-md:arrow-close-right',
    text: '关闭右侧'
  }, {
    action: TabActions.closeAll,
    icon: 'codicon:close-all',
    text: '关闭全部'
  }
])

const handleClick = (item: any) => {
  emits('tabMenuClick', item.action)
}
</script>
<style scoped lang="scss">
.myTabs {
  :deep(.el-tabs__header) {
    @apply p-0 m-0 border-b-none;

    .el-tabs__nav {
      @apply border-none;
    }
  }

  :deep(.el-tabs__item) {
    height: 34px;
    margin-right: 5px;
    line-height: 34px;
    border: 1px solid var(--el-border-color) !important;
    border-radius: 4px;
    box-sizing: border-box;
    transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;

    &.is-active {
      color: var(--el-color-primary) !important;
      background: var(--el-color-primary-light-9) !important;
      border: 1px solid var(--el-color-primary) !important;
    }
  }
}
</style>