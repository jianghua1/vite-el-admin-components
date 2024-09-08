<template>
  <el-form v-bind="props" :model="model" :rules="rules" ref="tableRef">
    <slot name="default">
      <template v-if="schema && schema.length">
        <VFormLayout v-for="(item, index) in schema" :key="index" v-bind="item" v-model="model[item?.prop as string]">
        </VFormLayout>
      </template>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </slot>
  </el-form>
</template>

<script setup lang='ts'>
import type { FormInstance } from 'element-plus'
import type { VFromProps } from './types';

import { useForm } from './useForm';

const props = withDefaults(defineProps<VFromProps>(), {
  inline: false,
  labelPosition: 'right',
  hideRequiredAsterisk: false,
  showMessage: true,
  inlineMessage: false,
  statusIcon: false,
  validateOnRuleChange: true,
  disabled: false,
  scrollToError: false
})

const tableRef = ref<FormInstance>()

const emits = defineEmits(['update:modelValue'])

const { model, rules } = useForm(props.schema ?? [])

watch(model, () => {
  emits('update:modelValue', model.value)
}, {
  deep: true
})

const onSubmit = () => {
  tableRef.value?.validate()
}


</script>
<style scoped></style>
