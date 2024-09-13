<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="自适应高度" name="1">
      <VpTable :data="tableData" :columns="columns" highlight-current-row :pagination="pagination" adaptive>
      </VpTable>
    </el-tab-pane>
    <el-tab-pane label="列拖拽" name="2">
      <VpTable :data="tableData" :columns="columns" highlight-current-row :pagination="pagination" adaptive
        draggableCol>
      </VpTable>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang='ts'>
import type { VpPaginationType, VpTableColumnType } from 'el-admin-components';
import { ref } from 'vue';


const activeName = ref('1')

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }
]

const columns = [
  {
    prop: 'date',
    label: '日期'
  },
  {
    prop: 'name',
    label: '姓名'
  },
  {
    prop: 'address',
    label: '地址'
  }
] as VpTableColumnType[]

const pagination = ref({
  align: 'center',
  small: false,
  background: false,
  layout: 'total, sizes, prev, pager, next, jumper',
  pagerCount: 7,
  pageSizes: [10, 20, 30, 40, 50],
  total: 300
} as VpPaginationType)


</script>
<style scoped></style>