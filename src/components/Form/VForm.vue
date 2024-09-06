<template>
  <el-form v-bind="props" :model="model" :rules="rules" ref="formRef">
    <slot name="default">
      <!-- <el-row :class="rowClass" :style="rowStyle"> -->
      <template v-if="schema && schema.length">
        <VFormLayout v-for="(item, index) in schema" :key="index" v-bind="item" v-model="model[item?.prop as string]">
        </VFormLayout>
      </template>
      <!-- </el-row> -->
    </slot>
    <slot name="actions">
    </slot>
  </el-form>
</template>

<script setup lang='ts'>
import type { FormInstance, FormItemProp } from 'element-plus'
import type { VFromProps } from './types';

import { useForm } from './useForm';
import { exposeEventsUtils } from '@/utils';

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

const formRef = ref<FormInstance>()

const emits = defineEmits<{
  validate: [prop: FormItemProp, isValid: boolean, message: string],
  'update:modelValue': [model: any]
}>()

const exposeEventNames = [
  'validate',
  'validateField',
  'resetFields',
  'scrollToField',
  'clearValidate'
]

const exposes = exposeEventsUtils(formRef, exposeEventNames)

defineExpose({ ...exposes })

const { model, rules } = useForm(props.schema ?? [])

watch(model, () => {
  emits('update:modelValue', model.value)
}, {
  deep: true
})

</script>
<style scoped></style>
