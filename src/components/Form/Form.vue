<template>
  <el-form :model="modelValue" :rules="rules" ref="formRef" v-bind="restProps">
    <slot name="default">
      <el-row :class="rowClass" :style="rowStyle">
        <template v-if="schema && schema.length">
          <FormLayout v-for="(item, index) in schema" :key="index" v-bind="item"
            v-model="internalModel[item.prop as string]">
          </FormLayout>
        </template>
      </el-row>
    </slot>
    <slot name="actions"></slot>
  </el-form>
</template>

<script setup lang="ts">
import { exposeEventsUtils } from '@/utils/format'
import type { FormProps } from './types'
import { useForm } from './useForm'
import type { FormInstance } from 'element-plus'

const exposeEvents = ['validate', 'validateField', 'resetFields', 'clearValidate', 'scrollToField']

const props = withDefaults(defineProps<FormProps>(), {
  inline: false,
  labelPosition: 'right',
  hideRequiredAsterisk: false,
  requireAsteriskPosition: 'left',
  showMessage: true,
  inlineMessage: false,
  statusIcon: false,
  validateOnRuleChange: false,
  disabled: false,
  scrollToError: false
})

const formRef = ref<FormInstance>()

const modelValue = defineModel()
const exposes = exposeEventsUtils(formRef, exposeEvents)

defineExpose({ ...exposes })

const { model, internalModel, rules } = useForm(props)

const restProps = computed(() => {
  const { rules, model, ...rest } = props
  return rest
})

watch(
  model,
  () => {
    modelValue.value = model.value
  },
  {
    deep: true
  }
)
watch(

  modelValue,
  () => {
    internalModel.value = modelValue.value
  },
  {
    deep: true
  }
)
</script>
<style scoped></style>
