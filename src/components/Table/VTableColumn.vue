<template>
  <el-table-column v-bind="props">
    <template #default="scope" v-if="defaultSlot">
      <component :is="defaultSlot" v-bind="scope"></component>
    </template>
    <!-- 这是个表头 -->
    <template #header="scope" v-if="headerSlot">
      <component :is="headerSlot" v-bind="scope"></component>
    </template>
    <!-- 多级表头 -->
    <template v-if="children && children.length">
      <!-- 递归 在组件内部是可以自己嵌套自己的 -->
      <VTableColumn v-for="(child, index) in children" :key="index" v-bind="child">

      </VTableColumn>
    </template>
  </el-table-column>
</template>
<script setup lang='ts'>
import type { TableColumnType } from './types';

const props = defineProps<TableColumnType>()

</script>
<style scoped></style>