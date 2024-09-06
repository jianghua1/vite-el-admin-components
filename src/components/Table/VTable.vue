<template>
  <el-table v-loading="loading" v-bind="props" v-on="events" style="width: 100%" ref="tableRef">
    <Column v-for="(column, index) in columns" :key="column.id || index" v-bind="setColumnDefaults(column)">
    </Column>
    <slot></slot>
  </el-table>
  <slot name="footer">
    <div v-if="isDefined(pagination)" :class="['p-2 flex', paginationClass]">
      <el-pagination v-bind="pagination" v-on="pageEvents">
        <template #default="scope" v-if="pagination.defaultSlot">
          <component :is="pagination.defaultSlot" v-bind="scope"></component>
        </template>
      </el-pagination>
    </div>
  </slot>
</template>

<script lang="ts" setup>
import type { TableEmitsType, TableEventsType, TableColumnType, VTableProps } from './types';
import { isDefined } from '@vueuse/core';
import Column from './VTableColumn.vue';
import { forwardEventsUtils, exposeEventsUtils } from '@/utils'
import { nextTick } from 'vue';
import Sortable from 'sortablejs';

const props = withDefaults(defineProps<VTableProps>(), {
  stripe: false,
  border: false,
  fit: true,
  showHeader: true,
  highlightCurrentRow: false,
  emptyText: '暂无数据',
  defaultExpandAll: false,
  tooltipEffect: 'dark',
  showSummary: false,
  flexible: false,
  selectOnIndeterminate: true,
  indent: 16,
  tableLayout: 'fixed',
  scrollbarAlwaysOn: true,
  adaptive: false,
  loading: false,
  draggableCol: false,
  draggableRow: false
})
//集中定义table组件的emits
const emits = defineEmits<TableEmitsType>()
//emits的事件名称虽然是驼峰，这里是-，但是在内部vue是有这个处理能力的，所以这里不处理是可以的
const eventsName: (keyof TableEventsType)[] = [
  'select',
  'select-all',
  'selection-change',
  'cell-mouse-enter',
  'cell-mouse-leave',
  'cell-click',
  'cell-dblclick',
  'cell-contextmenu',
  'row-click',
  'row-contextmenu',
  'row-dblclick',
  'header-click',
  'header-contextmenu',
  'sort-change',
  'filter-change',
  'current-change',
  'header-dragend',
  'expand-change',
];

const pageEventName = [
  'size-change',
  'current-change',
  'prev-click',
  'next-click'
]

const tableRef = ref()
const exposeEventNames = [
  "clearSelection",
  "getSelectionRows",
  "toggleRowSelection",
  "toggleAllSelection",
  "toggleRowExpansion",
  "setCurrentRow",
  "clearSort",
  "clearFilter",
  "doLayout",
  "sort",
  "scrollTo",
  "setScrollTop",
  "setScrollLeft",
  "columns"
]
const pageEvents = forwardEventsUtils(emits, pageEventName, 'page-')
const events = forwardEventsUtils(emits, eventsName)
const exposes = exposeEventsUtils(tableRef, exposeEventNames)
const localCols = ref(props.columns as TableColumnType[])

defineExpose({
  ...exposes
})
/**
 * element plus表格组件的Table Exposes都是针对el-table标签的，但是由于组件封装所有的Exposes
 * 都要写到VTable上，为了能让Exposes穿过VTable作用到el-table上，所以在这里动态生成一组Exposes
 */

const paginationClass = computed(() => {
  let defaultClass = 'justify-center'
  if (props.pagination && props.pagination.align) {
    if (props.pagination.align === 'left') {
      defaultClass = 'justify-start'
    }
    if (props.pagination.align === 'right') {
      defaultClass = 'justify-end'
    }
  }
  return defaultClass
})
//自适应高度
async function setAdaptive() {
  //等待下次dom的刷新
  await nextTick()
  if (props.adaptive) {
    let offset = 50
    if (typeof props.adaptive === 'number') {
      offset = props.adaptive
    }
    //窗口高度-table距离顶部的高度-table距离底部的高度
    const height = window.innerHeight -
      tableRef.value.$el.getBoundingClientRect().top - offset
    tableRef.value.style.height = height + 'px'
  }
}
//防抖动
const fn = useDebounceFn(setAdaptive, 200)
//监视高度变化
useResizeObserver(tableRef, fn)

function columnDrop() {
  nextTick(() => {
    //从当前表格对象开始，然后使用对应选择器找dom元素
    const el = tableRef.value.$el.
      querySelector('.el-table__header-wrapper tr')
    Sortable.create(el, {
      delay: 0,
      animation: 300,
      onEnd: ({ oldIndex, newIndex }) => {
        //调整元素的位置
        const draggedItem = localCols.value.splice(oldIndex, 1)[0]
        localCols.value.splice(newIndex, 0, draggedItem)
      }
    })
  })
}

onBeforeMount(() => {
  localCols.value = addId(props.draggableCol, props.columns)
})

onMounted(() => {
  //自适应高度
  if (props.adaptive) {
    setAdaptive()
  }
  //列拖拽
  if (props.draggableCol) {
    columnDrop()
  }
  //行拖拽
  if (props.draggableRow) {

  }
})

const columnDefault = {
  sortable: false,
  sortBy: '',
  'sort-orders': [null, 'ascending', 'descending'],
  resizable: true,
  align: 'left',
  'reserve-selection': false,
  'filter-multiple': true
}

function setColumnDefaults(column: object) {
  return { ...columnDefault, ...column }
}

function addId(flag: boolean, arr: any[]) {
  if (flag && arr.length && !arr[0].id) {
    arr.forEach((item, index) => {
      item.id = index
    })
  }
  return arr
}
</script>
