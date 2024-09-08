<template>
  <el-form-item v-bind="props">
    <el-input v-if="type === 'input'" v-model="modelValue" v-bind="attrs" />
    <el-date-picker v-else-if="type === 'date-picker'" v-model="modelValue" v-bind="attrs" />
    <el-time-picker v-else-if="type === 'time-picker'" v-model="modelValue" v-bind="attrs" />
    <el-switch v-else-if="type === 'switch'" v-model="modelValue" />
    <el-select v-else-if="type === 'select'" v-model="modelValue" v-bind="attrs">
      <el-option :label="item.label" :value="item.value" v-for="(item, index) in children" :key="index" v-bind="item" />
    </el-select>
    <el-checkbox-group v-else-if="type === 'checkbox'" v-model="modelValue" v-bind="attrs">
      <el-checkbox :label="item.label" :value="item.value" v-for="(item, index) in children" :key="index"
        v-bind="item" />
    </el-checkbox-group>
    <el-radio-group v-else-if="type === 'radio'" v-model="modelValue" v-bind="attrs">
      <!-- 这里要注意radio的value是对象模型的laber属性， -->
      <el-radio :label="item.value" v-for="(item, index) in children" :key="index" v-bind="item">{{ item.label
        }}</el-radio>
    </el-radio-group>
    <span v-else class="text-gray-500" v-bind="attrs">{{ value }}</span>
  </el-form-item>
</template>

<script setup lang='ts'>
import type { FormItemProp } from "./types"

const props = withDefaults(defineProps<FormItemProp>(), {
  showMessage: true,
  labelWidth: '',
  inlineMessage: '',
  required: undefined
})

const modelValue = defineModel()

onBeforeMount(() => {
  // if (props.type === 'select' && props.value === '') {
  //   modelValue.value = undefined
  // } else {
  //   modelValue.value = props.value
  // }
})


</script>
<style scoped></style>