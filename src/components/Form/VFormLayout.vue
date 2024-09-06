<template>
  <template v-if="schema && schema.length">
    <el-form-item v-bind="props" required>
      <el-col v-bind="item.colProps" :span="item.span" v-for="(item, index) in schema" :key="index">
        <VFormItem v-bind="item" v-model="modelValue[item?.prop as string]"></VFormItem>
      </el-col>
    </el-form-item>
  </template>
  <template v-else-if="colProps || span">
    <el-col :span="colProps?.span || span" v-bind="colProps">
      <VFormItem v-bind="props" v-model="modelValue">
      </VFormItem>
    </el-col>
  </template>
  <template v-else>
    <VFormItem v-bind="props" v-model="modelValue">
    </VFormItem>
  </template>
</template>

<script setup lang='ts'>
import type { FormItemProp } from "./types";

const props = withDefaults(defineProps<FormItemProp>(), {
  showMessage: true,
  labelWidth: '',
  inlineMessage: '',
  required: undefined
})

const modelValue = defineModel()
//初始化modelValue

onBeforeMount(() => {
  // modelValue.value = props.value
  //遍历schema
  // const arr = [1, 2, 3, 4, 5];

  // arr.forEach((item, index) => {
  //   console.log(item);
  // });
  //若对象中不存在prop属性，或者prop不是string，就打印出来

})

</script>
<style scoped></style>