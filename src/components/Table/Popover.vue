<template>
  <el-popover v-if="row && Object.keys(row).length" effect="light" trigger="hover" placement="top" width="auto">
    <template #default>
      <div>name: {{ row.name }}</div>
      <div>address: {{ row.address }}</div>
    </template>
    <template #reference>
      <el-tag>{{ row.name }}</el-tag>
    </template>
  </el-popover>

</template>

<script setup lang='ts'>
defineProps({
  row: {
    type: Object,
    default: () => ({})
  }
})
definePage({
  meta: {
    title: '高级表格222',
    icon: 'fluent:select-all-on-24-regular',
    order: 120
  }
})

</script>
<style scoped></style>