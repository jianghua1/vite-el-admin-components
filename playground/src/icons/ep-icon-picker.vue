<template>
  <div>
    <IconPicker @submit="handleSubmit"></IconPicker>
  </div>
</template>

<script setup lang='ts'>
import type { IconPickerSubmitDataType } from '@/components/Icon/types';

const handleSubmit = (data: IconPickerSubmitDataType) => {
}
</script>
<style scoped></style>