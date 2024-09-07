<template>
  <el-form-item v-bind="props" :ref="(ref) => props?.itemRef && props.itemRef(ref as FormItemInstance)">
    <template #default>
      <template v-if="props?.prefixSlot">
        <component :is="props.prefixSlot" v-bind="props"></component>
      </template>
      <component :is="props.defaultSlot" v-bind="props" v-if="props?.defaultSlot" v-model="modelValue"></component>
      <div v-else class="w-full flex default-slot-item">
        <!-- <el-input
        v-if="type === 'input'"
        v-model="modelValue"
        v-bind="attrs"
        v-on="events"
        :ref="(ref) => props.childRef && props.childRef(ref)"
      /> -->
        <!-- <el-input-number
        v-if="type === 'input-number'"
        v-model="modelValue"
        v-bind="attrs"
        v-on="events"
        :ref="(ref) => props.childRef && props.childRef(ref)"
      />
      <el-rate
        v-if="type === 'rate'"
        v-model="modelValue"
        v-bind="attrs"
        v-on="events"
        :ref="(ref) => props.childRef && props.childRef(ref)"
      />
      <el-slider v-if="type === 'slider'" v-model="modelValue" v-bind="attrs" v-on="events" />
      <el-calendar v-if="type === 'calendar'" v-model="modelValue" v-bind="attrs" v-on="events" />
      <el-date-picker
        v-else-if="type === 'date-picker'"
        v-model="modelValue"
        v-bind="attrs"
        v-on="events"
      />
      <el-tree-select
        v-else-if="type === 'tree-select'"
        v-model="modelValue"
        v-bind="attrs"
        v-on="events"
      />
      <el-time-picker
        v-else-if="type === 'time-picker'"
        v-model="modelValue"
        v-bind="attrs"
        v-on="events"
        :ref="(ref) => props.childRef && props.childRef(ref)"
      />
      <el-switch
        v-else-if="type === 'switch'"
        v-model="modelValue"
        v-bind="attrs"
        v-on="events"
        :ref="(ref) => props.childRef && props.childRef(ref)"
      /> -->
        <el-select v-if="type === 'select'" v-model="modelValue" v-bind="attrs" v-on="events">
          <el-option :label="item.label" :value="item.value" v-bind="item" v-for="(item, index) in children"
            :key="index" />
        </el-select>
        <el-checkbox-group v-else-if="type === 'checkbox' || type === 'checkbox-group'" v-model="modelValue"
          v-bind="attrs">
          <component :is="'el-' + item.type" :label="item.label" :value="item.value" v-bind="item" v-on="events"
            v-for="(item, index) in children" :key="index" />
        </el-checkbox-group>
        <el-radio-group v-else-if="type === 'radio' || type === 'radio-group'" v-model="modelValue" v-bind="attrs"
          v-on="events">
          <component :is="'el-' + item.type" v-for="(item, index) in children" :key="index" :label="item.value">{{
            item.label
            }}</component>
        </el-radio-group>
        <!-- <el-autocomplete
        v-else-if="type === 'autocomplete'"
        v-model="modelValue"
        v-bind="attrs"
        v-on="events"
        :ref="(ref) => props.childRef && props.childRef(ref)"
      ></el-autocomplete>
      <el-cascader
        v-else-if="type === 'cascader'"
        v-model="modelValue"
        v-bind="attrs"
        v-on="events"
        :ref="(ref) => props.childRef && props.childRef(ref)"
      /> -->
        <el-upload v-else-if="type === 'upload'" v-model:file-list="modelValue" v-bind="uploadAttrs"
          :ref="(ref) => props.childRef && props.childRef(ref)">
          <template #tip v-if="showSlot('tipSlot')">
            <component :is="props.slots!.tipSlot" v-bind="props"></component>
          </template>
          <template #file="{ file }" v-if="showSlot('fileSlot')">
            <component :is="props.slots!.fileSlot" v-bind="props" :file="file"></component>
          </template>
          <template #default v-if="showSlot('defaultSlot')">
            <component :is="props.slots!.defaultSlot" v-bind="props"></component>
          </template>
          <template #trigger v-if="showSlot('triggerSlot')">
            <component :is="props.slots!.triggerSlot" v-bind="props"></component>
          </template>
        </el-upload>
        <component :is="'el-' + type" v-else-if="
          !['checkbox', 'radio', 'select'].includes(type || '') &&
          typeof type !== 'undefined' &&
          type !== ''
        " v-model="modelValue" v-bind="attrs" v-on="events" :ref="(ref) => props.childRef && props.childRef(ref)" />
        <span v-else v-bind="attrs">{{ value }}</span>
      </div>
      <template v-if="props?.suffixSlot">
        <component :is="props.suffixSlot" v-bind="props"></component>
      </template>
    </template>
    <template #label="scope" v-if="props?.labelSlot">
      <component :is="props.labelSlot" v-bind="scope"></component>
    </template>
    <template #error="scope" v-if="props.errorSlot">
      <component :is="props.errorSlot" v-bind="scope"></component>
    </template>
  </el-form-item>
</template>

<script setup lang="ts">
// import { exposeEventsUtils } from '@/utils/format'
import type { FormItemProp } from './types'
import type { FormItemInstance } from 'element-plus'

const props = withDefaults(defineProps<FormItemProp>(), {
  showMessage: true,
  labelWidth: '',
  inlineMessage: '',
  required: undefined
})

const uploadDefaultValues = {
  action: '#',
  headers: {},
  method: 'post',
  multiple: false,
  data: {},
  name: 'file',
  'with-credentials': false,
  'show-file-list': true,
  drag: false,
  accept: '',
  'list-type': 'text',
  'auto-upload': true,
  disabled: false
}
const uploadAttrs = computed(() => {
  return Object.assign(uploadDefaultValues, props.attrs)
})

// const formItemRef = ref<FormItemInstance>()

// const exposeEvents = [
//   'size',
//   'validateMessage',
//   'validateStatus',
//   'validate',
//   'clearValidate',
//   'resetFields'
// ]

const modelValue = defineModel()
// const exposes = exposeEventsUtils(formItemRef, exposeEvents)

// defineExpose({ ...exposes })

onBeforeMount(() => {
  // 针对于select类型，如果value为空串，则改成undefined
  if (props.type === 'select' && props.value === '') {
    modelValue.value = undefined
  } else {
    modelValue.value = props.value
  }
})

function showSlot(slotName: string) {
  return (
    slotName && typeof props.slots !== 'undefined' && typeof props.slots[slotName] !== 'undefined'
  )
}

// watch(formItemRef, () => {
//   if (formItemRef.value && props?.itemRef) {
//     props.itemRef(formItemRef.value)
//   }
// })
</script>

<style scoped lang="scss">
:deep(.el-form-item__content) {
  @apply flex flex-nowrap;
}
</style>
