<template>
  <div>
    <VpForm :schema="schema" v-model="any"></VpForm>
    <VpEditor class="mt-5" :options="any" v-model="value"></VpEditor>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

const any = ref({} as any)

const schema = ref([
  {
    label: '模式',
    prop: 'mode',
    type: 'radio-group',
    value: 'ir',
    attrs: {
      size: 'small'
    },
    children: [
      {
        type: 'radio-button',
        label: 'WYSIWYG',
        value: 'wysiwyg'
      },
      {
        type: 'radio-button',
        label: '即时渲染',
        value: 'ir'
      },
      {
        type: 'radio-button',
        label: '分屏预览',
        value: 'sv'
      }
    ],
    colProps: {
      xs: 24,
      sm: 12,
      md: 11
    }
  },
  {
    type: 'radio-group',
    value: 'zh_CN',
    label: '设置语言',
    prop: 'lang',
    attrs: {
      size: 'small'
    },
    children: [
      { type: 'radio-button', label: '中', value: 'zh_CN' },
      { type: 'radio-button', label: '英', value: 'en_US' },
      { type: 'radio-button', label: '繁', value: 'zh_TW' }
    ],
    colProps: {
      xs: 24,
      sm: 12,
      md: 7
    }
  },
  {
    type: 'input-number',
    value: '400',
    label: '设置高度',
    prop: 'height',
    attrs: {
      size: 'small',
      step: 10,
      min: 400
    },
    colProps: {
      xs: 24,
      sm: 12,
      md: 6
    }
  },
  {
    type: 'radio-group',
    value: 'ant',
    label: '图标设计',
    prop: 'icon',
    attrs: {
      size: 'small'
    },
    children: [
      {
        type: 'radio-button',
        label: 'Ant Design',
        value: 'ant'
      },
      {
        type: 'radio-button',
        label: 'Material Design',
        value: 'material'
      }
    ],
    colProps: {
      xs: 24,
      sm: 12
      // md: 12
    }
  }
] as any)
</script>

<style scoped></style>
