<template>
  <template v-if="schema && schema.length">
    <el-form-item v-bind="props">
      <el-col
        v-bind="item.colProps"
        :span="item.span || item.colProps?.span"
        v-for="(item, index) in schema"
        :key="index"
      >
        <FormItem v-bind="item" v-model="modelValue[item?.prop as string]"></FormItem>
      </el-col>
    </el-form-item>
  </template>
  <template v-else-if="colProps || span">
    <el-col :span="colProps?.span || span" v-bind="colProps">
      <FormItem v-bind="props" v-model="modelValue"></FormItem>
    </el-col>
  </template>
  <template v-else>
    <FormItem v-bind="props" v-model="modelValue"></FormItem>
  </template>
</template>

<script setup lang="ts">
import type { FormItemProp } from './types'
import FormItem from './FormItem.vue'

const props = withDefaults(defineProps<FormItemProp>(), {
  showMessage: true,
  labelWidth: '',
  inlineMessage: '',
  required: undefined
})

const modelValue = defineModel<any>()
</script>

<style scoped></style>
