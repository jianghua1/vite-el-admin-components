<template>
  <template v-if="schema && schema.length">
    <template v-if="colProps?.span || span">
      <el-col :span="colProps?.span || span" v-bind="colProps">
        <FormSchemaItem v-bind="props" v-model="modelValue"></FormSchemaItem>
      </el-col>
    </template>
    <template v-else>
      <FormSchemaItem v-bind="props" v-model="modelValue"></FormSchemaItem>
    </template>
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
import FormSchemaItem from './FormSchemaItem.vue'

const props = withDefaults(defineProps<FormItemProp>(), {
  showMessage: true,
  labelWidth: '',
  inlineMessage: '',
  required: undefined
})

const modelValue = defineModel<any>()
</script>

<style scoped></style>
