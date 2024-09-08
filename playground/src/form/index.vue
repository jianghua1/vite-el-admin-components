<template>
  <VForm v-model="model" :schema="schema" ref="formRef">
    <template #actions>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </template>
  </VForm>
  {{ formValue }}
</template>

<script setup lang='ts'>
import type { FormSchema } from "@/components/Form/types";
import { useForm } from "@/components/Form/useForm";
import type { FormInstance, FormItemInstance } from 'element-plus';

definePage({
  meta: {
    title: '基础表单',
    icon: 'mdi:message',
    order: 110
  }
})

const formRef = ref<FormInstance>()
const formItemRef = ref<FormItemInstance>()

const schema = ref([
  {
    prop: 'name',
    label: 'Activity name',
    type: 'input',
    value: '',
    rules: [
      {
        required: true,
        trigger: 'blur'
      },
      {
        min: 3,
        max: 5,
        message: 'Length should be 3 to 5',
        trigger: 'blur',
        informType: 'warning'
      }
    ],
    itemRef: (ref: FormItemInstance) => {
      formItemRef.value = ref
    }
  },
  {
    prop: 'region',
    label: 'Activity zone',
    type: 'select',
    value: undefined,
    rules: [
      {
        required: true,
        message: 'Please select Activity zone',
        trigger: 'change'
      }
    ],
    children: [
      {
        label: 'Zone one',
        value: 'shanghai'
      },
      {
        label: 'Zone two',
        value: 'beijing'
      }
    ]
  },
  {
    prop: '',
    label: 'Activity time',
    schema: [
      {
        span: 11,
        prop: 'date1',
        type: 'date-picker',
        label: 'Pick a date',
        value: '',
        attrs: {
          type: 'date',
          placeholder: 'Pick a date',
          style: {
            width: '100%'
          }
        },
        rules: [
          {
            type: 'date',
            required: false,
            message: 'Please pick a date',
            trigger: 'change'
          }
        ]
      },
      {
        span: 2,
        value: '-',
        attrs: {
          class: 'text-center w-full'
        }
      },
      {
        span: 11,
        prop: 'date2',
        type: 'time-picker',
        label: 'Pick a time',
        value: '',
        attrs: {
          placeholder: 'Pick a time',
          style: {
            width: '100%'
          }
        },
        rules: [
          {
            type: 'date',
            required: false,
            message: 'Please pick a date',
            trigger: 'change'
          }
        ]
      }
    ]
  },
  {
    prop: 'delivery',
    label: 'Instant delivery',
    type: 'switch',
    value: false
  },
  {
    prop: 'type',
    label: 'Activity type',
    type: 'checkbox-group',
    value: [],
    children: [
      {
        type: 'checkbox',
        label: 'Online activities',
        name: 'type'
      },
      {
        type: 'checkbox',
        label: 'Promotion activities',
        name: 'type'
      },
      {
        type: 'checkbox',
        label: 'Offline activities',
        name: 'type'
      },
      {
        type: 'checkbox',
        label: 'Simple brand activities',
        name: 'type'
      }
    ],
    rules: [
      {
        type: 'array',
        required: true,
        message: 'Please select at least one activity type',
        trigger: 'change'
      }
    ]
  },
  {
    prop: 'resource',
    label: 'Resources',
    type: 'radio',
    value: [],
    children: [
      {
        label: 'Sponsor'
      },
      {
        label: 'Venue'
      }
    ],
    rules: [
      {
        required: true,
        message: 'Please select activity resource',
        trigger: 'change'
      }
    ]
  },
  {
    prop: 'desc',
    label: '',
    type: 'input',
    value: '',
    attrs: {
      type: 'textarea'
    },
    rules: [
      {
        required: true,
        message: 'Please input activity form',
        trigger: 'blur'
      }
    ]
  }
] as FormSchema)

const { model, formValue } = useForm(schema.value)

const onUpdate = (model: any) => {
  // Object.assign(form, model)
}

const onSubmit = () => {
  formRef.value?.validate()
}

const onCancel = () => {
  formItemRef.value?.clearValidate()
}
</script>
<style scoped lang="scss"></style>