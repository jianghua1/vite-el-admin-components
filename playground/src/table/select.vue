<template>
  <div>
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="单选" name="1">
        <VpTable @row-click="handleRowClick" :columns="fixedTableColumns" :data="fixedTableData" highlight-current-row>
        </VpTable>
        <p>行点击回调内容</p>
        <p>{{ rowClickRef }}</p>
        <p>菜单点击回调内容</p>
        <p>{{ menuClickRef }}</p>
      </el-tab-pane>
      <el-tab-pane label="多选" name="2">
        <VpTable ref="multipleTableRef" :columns="selectColumns" :data="tableData" highlight-current-row
          @selection-change="handleSelectionChange">
        </VpTable>
        <div style="margin-top: 20px">
          <el-button @click="toggleSelection([tableData[1], tableData[2]])">
            Toggle selection status of second and third rows
          </el-button>
          <el-button @click="toggleSelection()">Clear selection</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="排序" name="3">
        <VpTable :columns="orderColumns" :data="tableData" :default-sort="{ prop: 'date', order: 'descending' }">
        </VpTable>
      </el-tab-pane>
      <el-tab-pane label="过滤" name="4">
        <VpTable :columns="filterColumns" :data="filterTableData" ref="filterTableRef">
        </VpTable>
        <div>
          <el-button @click="resetDateFilter">reset date filter</el-button>
          <el-button @click="clearFilter">reset all filters</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="插槽" name="5">
        <VpTable :columns="customColumns" :data="customTableData">
          <el-table-column label="Operations">
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope)">Edit</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope)">Delete</el-button>
            </template>
          </el-table-column>
        </VpTable>
      </el-tab-pane>
      <el-tab-pane label="树形结构" name="8">
        <VpTable :columns="treeTableColumns" :data="treeTableData" default-expand-all row-key="id" border></VpTable>
      </el-tab-pane>
      <el-tab-pane label="表尾合计" name="9">
        <VpTable :columns="sumTableColumns" :data="sumTableData" show-summary border></VpTable>
        <VpTable :columns="sumTableColumns" :data="sumTableData" show-summary :summary-method="getSummaries" border>
        </VpTable>
      </el-tab-pane>
      <el-tab-pane label="行和列合并" name="10">
        <VpTable :columns="sumTableColumns" :data="sumTableData" :span-method="arraySpanMethod" border></VpTable>
        <VpTable :columns="sumTableColumns" :data="sumTableData" :span-method="objectSpanMethod" border
          style="width: 100%; margin-top: 20px">
        </VpTable>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang='tsx'>

import type { VpTableColumnType } from "el-admin-components"
import type { ElTable } from "element-plus"
import VpPopOver from "el-admin-components"
import { Timer } from '@element-plus/icons';
import { ref, h } from "vue";

const activeName = ref('1')
const rowClickRef = ref()
const menuClickRef = ref()
//单选的回调 三个参数： row，column，event
const handleRowClick = (...args: any) => {
}

const handleClick = (scope, opt: string) => {
  menuClickRef.value = scope.row + scope.column + opt
}

const fixedTableColumns = [
  { label: '日期', prop: 'date' },
  { label: '姓名', prop: 'name' },
  { label: '州', prop: 'state' },
  { label: '城市', prop: 'city' },
  { label: '地址', prop: 'address' },
  { label: '邮政编码', prop: 'zip' },
  { label: '标签', prop: 'tag' },
  {
    label: '操作', prop: 'operation', width: '120', fixed: 'right',
    defaultSlot: (_props) => (
      <>
        <el-button link type="primary" size="small" onClick={(e) => {
          e.stopPropagation();
          handleClick(_props, 'detail')
        }}>
          Detail
        </el-button>
        <el-button link type="primary" size="small" onClick={(e) => {
          e.stopPropagation();
          handleClick(_props, 'edit')
        }}>
          Edit
        </el-button>
      </>
    )
  }
] as VpTableColumnType[]

const fixedTableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
]
//多选
interface User {
  id?: number
  date: string
  name: string
  address: string
  tag?: string
  children?: User[]
}

const tableData: User[] = [
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
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }
]

const selectColumns = [
  { type: 'selection', width: '55' },
  { label: '日期', prop: 'date' },
  { label: '姓名', prop: 'name' },
  { label: '地址', prop: 'address' },
] as VpTableColumnType[]

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<User[]>([])


const toggleSelection = (rows?: User[]) => {
  if (rows) {
    rows.forEach((row) => {
      multipleTableRef.value!.toggleRowSelection(row, undefined as any)
    })
  } else {
    multipleTableRef.value!.clearSelection()
  }
}
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
}
//排序
const orderColumns = [
  { label: '日期', prop: 'date', sortOrders: true },
  { label: '姓名', prop: 'name' },
  { label: '地址', prop: 'address' },
] as VpTableColumnType[]
//过滤
const filterHandler = (
  value: string,
  row: User,
  column: VpTableColumnType
) => {
  const property = column['property']
  return row[property as string] === value
}

const filterColumns = [
  {
    label: '日期', prop: 'date', filters: [
      { text: '2016-05-01', value: '2016-05-01' },
      { text: '2016-05-02', value: '2016-05-02' },
      { text: '2016-05-03', value: '2016-05-03' },
      { text: '2016-05-04', value: '2016-05-04' },
    ],
    'filterMethod': filterHandler,
    columnKey: 'date',
    sortable: true
  },
  { label: '姓名', prop: 'name' },
  { label: '地址', prop: 'address' },
  {
    label: '标签', prop: 'tag', filterMethod: (value, row) => {
      return row.tag === value
    }, filters: [
      { text: 'old', value: 'old' }, { text: 'new', value: 'new' }
    ]
  }
]

const filterTableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'new' // add a new property called 'tag'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'old'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'old'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'old'
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'old'
  }
]

const filterTableRef = ref()

const resetDateFilter = () => {
  filterTableRef.value!.clearFilter(['date'])
}

const clearFilter = () => {
  filterTableRef.value!.clearFilter()
}

// 自定义列模板
const customColumns = [
  {
    label: 'date',
    // prop: 'date'
    defaultSlot: (scope: any) => (
      <div style="display: flex; align-items: center">
        <el-icon><Timer /></el-icon>
        <span style="margin-left: 5px">{scope.row.date}</span>
      </div>
    )
  },
  {
    label: 'name',
    // prop: 'name'
    defaultSlot: (scope: any) => {
      const { row } = scope;
      return h(VpPopOver, {
        row: row
      });
    }
  }
] as VpTableColumnType[]

const customTableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
const handleEdit = (scope) => {
  console.log(scope.$index, scope.row)
}
const handleDelete = (scope) => {
  console.log(scope.$index, scope.row)
}
// 树形菜单
const treeTableData: User[] = [
  {
    id: 1,
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    id: 2,
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    children: [
      {
        id: 21,
        date: '2016-05-02',
        name: 'Tom Jr.',
        address: 'No. 189, Grove St, Los Angeles'
      }
    ]
  },
  {
    id: 3,
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
const treeTableColumns = [
  { label: '日期', prop: 'date' },
  { label: '姓名', prop: 'name' },
  { label: '地址', prop: 'address' }
] as VpTableColumnType[]

//表尾合计行
interface Product {
  id: string
  name: string
  amount1: string
  amount2: string
  amount3: number
}

interface SummaryMethodProps<T = Product> {
  columns: VpTableColumnType[]
  data: T[]
}

const sumTableColumns = [
  { label: 'ID', prop: 'id', width: 180 },
  { label: 'Name', prop: 'name' },
  { label: 'Amount 1', prop: 'amount1', sortable: true },
  { label: 'Amount 2', prop: 'amount2', sortable: true },
  { label: 'Amount 3', prop: 'amount3', sortable: true }
] as VpTableColumnType[]

const getSummaries = (param: SummaryMethodProps) => {
  const { columns, data } = param
  const sums: string[] = []
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = 'Total Cost'
      return
    }
    const values = data.map((item) => Number(item[column.property as string]))
    if (!values.every((value) => Number.isNaN(value))) {
      sums[index] = `$ ${values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!Number.isNaN(value)) {
          return prev + curr
        } else {
          return prev
        }
      }, 0)}`
    } else {
      sums[index] = 'N/A'
    }
  })

  return sums
}
const sumTableData: Product[] = [
  {
    id: '12987122',
    name: 'Tom',
    amount1: '234',
    amount2: '3.2',
    amount3: 10,
  },
  {
    id: '12987123',
    name: 'Tom',
    amount1: '165',
    amount2: '4.43',
    amount3: 12,
  },
  {
    id: '12987124',
    name: 'Tom',
    amount1: '324',
    amount2: '1.9',
    amount3: 9,
  },
  {
    id: '12987125',
    name: 'Tom',
    amount1: '621',
    amount2: '2.2',
    amount3: 17,
  },
  {
    id: '12987126',
    name: 'Tom',
    amount1: '539',
    amount2: '4.1',
    amount3: 15,
  },
]

//合并行或列
interface SpanMethodProps {
  row: User
  column: VpTableColumnType
  rowIndex: number
  columnIndex: number
}
const arraySpanMethod = ({
  row,
  column,
  rowIndex,
  columnIndex,
}: SpanMethodProps) => {
  if (rowIndex % 2 === 0) {
    if (columnIndex === 0) {
      return [1, 2]
    } else if (columnIndex === 1) {
      return [0, 0]
    }
  }
}

const objectSpanMethod = ({
  row,
  column,
  rowIndex,
  columnIndex,
}: SpanMethodProps) => {
  if (columnIndex === 0) {
    if (rowIndex % 2 === 0) {
      return {
        rowspan: 2,
        colspan: 1,
      }
    } else {
      return {
        rowspan: 0,
        colspan: 0,
      }
    }
  }
}
</script>
<style scoped></style>