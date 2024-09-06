<template>
  <svg aria-hidden="true">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon',
  },
  type: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'currentColor',
  }
})

const symbolId = computed(() => `#${props.prefix}-${props.type}`)
</script>