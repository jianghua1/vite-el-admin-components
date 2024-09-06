<template>
  <el-form-item v-bind="props" ref="formItemRef">
    <template #default v-if="props?.defaultSlot">
      <component :is="props?.defaultSlot" v-bind="props" />
    </template>
    <template #default v-else>
      <el-input v-if="type === 'input'" v-model="modelValue" v-bind="attrs" />
      <el-input-number v-if="type === 'input-number'" v-model="modelValue" v-bind="attrs" />
      <el-date-picker v-else-if="type === 'date-picker'" v-model="modelValue" v-bind="attrs" />
      <el-time-picker v-else-if="type === 'time-picker'" v-model="modelValue" v-bind="attrs" />
      <el-switch v-else-if="type === 'switch'" v-model="modelValue" />
      <el-select v-else-if="type === 'select'" v-model="modelValue" v-bind="attrs">
        <el-option :label="item.label" :value="item.value" v-for="(item, index) in children" :key="index"
          v-bind="item" />
      </el-select>
      <el-checkbox-group v-else-if="type === 'checkbox' || type === 'checkbox-group'" v-model="modelValue"
        v-bind="attrs">
        <template v-for="(item, index) in children" :key="index">
          <el-checkbox v-if="item.type === 'checkbox'" :label="item.label" :value="item.value" v-bind="item" />
          <el-checkbox-button v-if="item.type === 'checkbox-button'" :label="item.label" :value="item.value"
            v-bind="item" />
        </template>
      </el-checkbox-group>
      <el-radio-group v-else-if="type === 'radio' || type === 'radio-group'" v-model="modelValue" v-bind="attrs">
        <template v-for="(item, index) in children" :key="index">
          <el-radio v-bind="item" v-if="item.type === 'radio'" :label="item.value">{{ item.label }}</el-radio>
          <el-radio-button v-bind="item" v-else-if="item.type === 'radio-button'" :label="item.value">{{ item.label
            }}</el-radio-button>
        </template>
      </el-radio-group>
      <span v-else class="text-gray-500" v-bind="attrs">{{ value }}</span>
    </template>
    <template #label="scope" v-bind="props.labelSlot">
      <component :is="props.labelSlot" v-bind="scope" />
    </template>
    <template #error="scope" v-bind="props.errorSlot">
      <component :is="props.errorSlot" v-bind="scope" />
    </template>
  </el-form-item>
</template>

<script setup lang='ts'>
import type { FormItemInstance } from "element-plus"
import type { FormItemProp } from "./types"
import { exposeEventsUtils } from "@/utils";

const props = withDefaults(defineProps<FormItemProp>(), {
  showMessage: true,
  labelWidth: '',
  inlineMessage: '',
  required: undefined
})

const formItemRef = ref<FormItemInstance>()

const exposeEventNames = ['resetField', 'clearValidate', 'size', 'validateMessage', 'validateState', 'validate']

const modelValue = defineModel()

const exposes = exposeEventsUtils(formItemRef, exposeEventNames)

defineExpose({ ...exposes })

onBeforeMount(() => {
  // if (props.type === 'select' && props.value === '') {
  //   modelValue.value = undefined
  // } else {
  //   modelValue.value = props.value
  // }
})

// onMounted(() => {
watch(formItemRef, () => {
  if (formItemRef.value && props.itemRef) {
    props.itemRef(formItemRef.value)
  }
})

</script>
<style scoped></style>